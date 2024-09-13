import React from "react";
import { useRecordContext } from "react-admin"; 

export const PercentField = ({ source } : {source: string }) => {
  const record = useRecordContext();
  const value = record ? Math.round(record[source]) : null;
  return <span>{value}%</span>;
};

interface RelativeDateFieldProps {
  source?: string;
  value?: string; // New prop for custom date string
}

// Nicer way to display how long ago a date was
export const RelativeDateField: React.FC<RelativeDateFieldProps> = ({ source, value }) => {
  // Use the record context only if no direct value is provided
  const record = useRecordContext();
  const dateValue = value 
    ? new Date(value) 
    : record && source 
      ? new Date(record[source]) 
      : new Date('1970-01-01T00:00:00Z');
  
  const now = new Date();
  const diffMilliseconds = now.getTime() - dateValue.getTime();
  const diffMinutes = Math.floor(diffMilliseconds / 1000 / 60);
  const diffHours = Math.floor(diffMilliseconds / 1000 / 60 / 60);

  if (diffHours < 1) {
    if (diffMinutes < 1) {
      return <span>Just now</span>;
    } else {
      return <span>{diffMinutes} minutes ago</span>;
    }
  } else if (diffHours === 1) {
    return <span>1 hour ago</span>;
  } else if (diffHours < 24) {
    return <span>{diffHours} hours ago</span>;
  } else if (diffHours < 24 * 7) {
    return <span>{Math.floor(diffHours / 24)} days ago</span>;
  } else {
    return <span>A long time ago</span>;
  }
};
