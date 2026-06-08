// src/components/JobCard.jsx
// Dane z backendu kolegi mają: id, jobTitle, salary, description
import { Link } from "react-router-dom";
import "./JobCard.css";

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h2 className="job-title">{job.jobTitle}</h2>
        </div>
        <span className="job-salary">💰 {job.salary.toLocaleString()} zł</span>
      </div>

      <p className="job-description">{job.description}</p>

      <Link to={`/job/${job.id}`} className="btn-details">
        Zobacz ofertę →
      </Link>
    </div>
  );
}
