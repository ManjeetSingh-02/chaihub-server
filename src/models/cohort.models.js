// import external modules
import mongoose from 'mongoose';

// schema for cohort
const cohortSchema = new mongoose.Schema(
  {
    cohortName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 10,
      maxLength: 50,
    },
    cohortDescription: {
      type: String,
      required: true,
      trim: true,
      minLength: 20,
      maxLength: 200,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    allowedUsers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    associatedGroups: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
      default: [],
    },
    auditLogs: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AuditLog' }],
      default: [],
    },
  },
  { timestamps: true }
);

// export cohort model
export const Cohort = mongoose.model('Cohort', cohortSchema);
