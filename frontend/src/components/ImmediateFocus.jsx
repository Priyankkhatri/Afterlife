import React from 'react';
import { Sparkles } from 'lucide-react';

export const ImmediateFocus = ({ onAction }) => {
  const urgentTasks = [
    { 
      id: 'focus-1', 
      title: 'Notify Life Insurance Provider', 
      description: 'MetLife Policy #98221-A', 
      time: 'Due in 2 days',
      documentName: 'MetLife_Policy.pdf',
      variables: [
        { key: 'policy', label: 'Policy Number', value: 'MetLife #98221-A' },
        { key: 'deceased', label: 'Deceased Name', value: 'Ramesh Chandra Khatri' },
        { key: 'beneficiary', label: 'Beneficiary', value: 'Priya Khatri' }
      ],
      defaultDraft: `Subject: Claim Notification - Policy #98221-A\n\nDear MetLife Claims Department,\n\nI am writing to formally notify you of the passing of the policyholder, Ramesh Chandra Khatri, on June 28, 2026. As the designated beneficiary, I request the claims start package and details on necessary estate documentation.\n\nThank you for your guidance.\n\nSincerely,\nPriya Khatri\nClaimant`
    },
    { 
      id: 'focus-2', 
      title: 'Submit Funeral Leave Form', 
      description: 'Request for HR Department', 
      time: 'Due in 5 days',
      documentName: 'HR_Leave_Policy.pdf',
      variables: [
        { key: 'employee', label: 'Employee Name', value: 'Priya Khatri' },
        { key: 'manager', label: 'Manager Name', value: 'Sarah Chen' },
        { key: 'duration', label: 'Leave Duration', value: '5 Days (Bereavement)' }
      ],
      defaultDraft: `Dear HR Team & Sarah,\n\nI am writing to request bereavement leave following the passing of my father, Ramesh Chandra Khatri. As per company policy, I would like to request 5 days of paid funeral leave starting next Monday. I have attached the certificate draft for verification.\n\nBest regards,\nPriya Khatri\nSoftware Engineer`
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-antigravity border border-[#F0F0F0] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-text-primary">Immediate Focus</h3>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-accent-warm px-2.5 py-1 rounded-full bg-accent-warm/10">
          Priority
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {urgentTasks.map((task) => (
          <div key={task.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-background/50 transition-colors duration-300">
            <div>
              <h4 className="font-sans font-medium text-text-primary text-base mb-1">{task.title}</h4>
              <p className="font-sans text-xs text-text-muted font-light">{task.description} • {task.time}</p>
            </div>
            <button
              onClick={() => onAction && onAction(task)}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2 text-xs font-medium text-accent-warm bg-accent-warm/5 hover:bg-accent-warm/10 rounded-full border border-accent-warm/10 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Review AI Draft
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
