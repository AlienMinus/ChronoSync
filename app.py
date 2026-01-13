from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import io

from timetable_core import process_form_data, create_excel_bytes

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class SubjectItem(BaseModel):
    subject: str
    color: str
    day: str
    period: str
    duration: str
    info: Optional[str] = ""

class TimetableRequest(BaseModel):
    total_slots: int

    slot_settings: Dict[str, Any] 
    breaks: List[Dict[str, Any]]
    schedule_items: List[SubjectItem]


class RequestAdapter:
    """Adapts the Pydantic request to look like the 'form' object timetable_core expects."""
    def __init__(self, data: TimetableRequest):
        self.data = data
        
    def get(self, key, default=None):
        if key == 'total_slots': return str(self.data.total_slots)
     
        return self.data.slot_settings.get(key, default)

    def getlist(self, key):
        if key == 'subject': return [i.subject for i in self.data.schedule_items]
        if key == 'day': return [i.day for i in self.data.schedule_items]
        if key == 'period': return [i.period for i in self.data.schedule_items]
        if key == 'duration': return [i.duration for i in self.data.schedule_items]
        if key == 'info': return [i.info for i in self.data.schedule_items]
        if key == 'color': return [i.color for i in self.data.schedule_items]
        if key == 'break_name': return [b.get('name', '') for b in self.data.breaks]
        if key == 'break_start': return [b.get('start', '') for b in self.data.breaks]
        if key == 'break_end': return [b.get('end', '') for b in self.data.breaks]
        return []



@app.post("/api/generate")
async def generate_timetable(data: TimetableRequest):
    try:
       
        adapter = RequestAdapter(data)
        processed_grid = process_form_data(adapter)
        return processed_grid
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/export")
async def export_excel(data: Dict[str, Any] = Body(...)):
    """
    Expects the 'data' object returned by /api/generate 
    to create the Excel file.
    """
    try:
        excel_buffer = create_excel_bytes(
            schedule_data=data.get('export_data', {}),
            breaks=data.get('breaks', []),
            slot_starts=data.get('slot_starts', {}),
            slot_durations=data.get('slot_durations', {})
        )
        return StreamingResponse(
            excel_buffer,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": "attachment; filename=timetable.xlsx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)