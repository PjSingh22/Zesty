from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Listing

class ListingForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
