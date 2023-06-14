from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, FloatField, MultipleFileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Listing
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class ListingForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    images = MultipleFileField('Upload Images', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))], render_kw={'multiple': True})
