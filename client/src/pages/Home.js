import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 mb-4">Welcome to JobCompass</h1>
      <p className="lead">
        Track and manage your job applications.
      </p>
      <div className="mt-4">
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Go to Dashboard
        </Link>
        <Link to="/login" className="btn btn-secondary btn-lg ms-3">
          Login
        </Link>
      </div>
    </div>
  );
}