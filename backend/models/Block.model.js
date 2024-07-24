import mongoose from 'mongoose';
const { Schema } = mongoose;

const BlockSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 40,
    immutable: true,
    unique: true
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return this.endDate && value < this.endDate;
      },
      message: props => `${props.value} is later than end date`
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return this.startDate ? value > this.startDate : true;
      },
      message: props => `${props.value} is earlier than start date`
    },
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
  { timestamps: true }
);

const Block = mongoose.model('Block', BlockSchema);
export default Block;