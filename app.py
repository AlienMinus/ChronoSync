from flask import Flask, render_template, request, send_file
from datetime import datetime, timedelta
from waitress import serve
import json
import io
try:
    from openpyxl import Workbook
    from openpyxl.styles import Alignment, Font, PatternFill, Border, Side
except ImportError:
    Workbook = None

app = Flask(__name__)

DAYS_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

from timetable_core import process_form_data, create_excel_bytes

@app.route('/')
def index():
    """Renders the input form page."""
    return render_template('index.html', days=DAYS_ORDER)

@app.route('/generate', methods=['POST'])
def generate():
    """
    Processes the form data and renders the timetable.
    """
    result = process_form_data(request.form)
    return render_template('timetable.html',
                           schedule=result['schedule'],
                           grid_schedule=result['grid_schedule'],
                           days=result['days'],
                           export_data=result['export_data'],
                           breaks=result['breaks'],
                           header_times=result['header_times'],
                           slot_starts=result['slot_starts'],
                           slot_durations=result['slot_durations'],
                           periods_order=result['periods_order'])

@app.route('/export', methods=['POST'])
def export():
    if not Workbook:
        return "openpyxl library not installed. Please run: pip install openpyxl", 500

    schedule_data = json.loads(request.form.get('schedule_data', '{}'))
    breaks = json.loads(request.form.get('breaks', '[]'))
    slot_starts = json.loads(request.form.get('slot_starts', '{}'))
    slot_durations = json.loads(request.form.get('slot_durations', '{}'))

    try:
        out = create_excel_bytes(schedule_data, breaks, slot_starts, slot_durations)
    except RuntimeError:
        return "openpyxl library not installed. Please run: pip install openpyxl", 500

    return send_file(out, download_name="timetable.xlsx", as_attachment=True, mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
if __name__ == '__main__':
    # app.run(debug=True) # Uncomment for development mode
    print("Server running on http://localhost:5000")
    serve(app, host='0.0.0.0', port=5000)
