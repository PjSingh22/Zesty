from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, FloatField, MultipleFileField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Listing
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class ReviewForm(FlaskForm):
    context = StringField('context')
    rating = IntegerField('rating', validators=[DataRequired()])
