// TaskForm.jsx
import { useState } from "react";
import { createTask } from "../services/api";

function TaskForm({ refresh }) {

  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: ""
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await createTask({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      status: "Pending"
    });

    setTask({
      title: "",
      description: "",
      deadline: ""
    });

    refresh();
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: 'clamp(12px, 1.5vw, 20px)',
      marginBottom: 'clamp(32px, 5vw, 48px)',
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(12px)',
      padding: 'clamp(20px, 3vw, 32px)',
      borderRadius: 'clamp(24px, 4vw, 32px)',
      boxShadow: '0 20px 35px -12px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.02)',
      transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
      flexWrap: 'wrap',
      border: '1px solid rgba(226, 232, 240, 0.6)'
    }}>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
        style={{
          flex: '2',
          minWidth: '180px',
          padding: 'clamp(12px, 1.8vw, 16px) clamp(18px, 2.5vw, 24px)',
          borderRadius: '28px',
          border: '1px solid #e2e8f0',
          background: '#ffffff',
          outline: 'none',
          fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
          color: '#0f172a'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#3b82f6';
          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.02)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
        style={{
          flex: '3',
          minWidth: '200px',
          padding: 'clamp(12px, 1.8vw, 16px) clamp(18px, 2.5vw, 24px)',
          borderRadius: '28px',
          border: '1px solid #e2e8f0',
          background: '#ffffff',
          outline: 'none',
          fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
          color: '#0f172a'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#3b82f6';
          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.02)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      />

      <input
        type="date"
        name="deadline"
        value={task.deadline}
        onChange={handleChange}
        style={{
          flex: '1',
          minWidth: '160px',
          padding: 'clamp(12px, 1.8vw, 16px) clamp(18px, 2.5vw, 24px)',
          borderRadius: '28px',
          border: '1px solid #e2e8f0',
          background: '#ffffff',
          outline: 'none',
          fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
          color: task.deadline ? '#0f172a' : '#94a3b8'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#3b82f6';
          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.02)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      />

      <button 
        type="submit"
        style={{
          padding: 'clamp(12px, 1.8vw, 16px) clamp(28px, 3.5vw, 40px)',
          border: 'none',
          borderRadius: '32px',
          background: 'linear-gradient(105deg, #0f172a, #1e293b)',
          color: 'white',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
          transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
          boxShadow: '0 8px 20px -8px rgba(15, 23, 42, 0.3)',
          whiteSpace: 'nowrap',
          position: 'relative',
          overflow: 'hidden',
          letterSpacing: '0.3px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(105deg, #1e293b, #0f172a)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 16px 28px -12px rgba(15, 23, 42, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(105deg, #0f172a, #1e293b)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(15, 23, 42, 0.3)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(1px)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
      >
        Add Task
      </button>

      <style>{`
        @media (max-width: 820px) {
          form {
            flex-direction: column;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(16px);
            padding: 24px;
            border-radius: 28px;
            gap: 16px;
            border: 1px solid rgba(226, 232, 240, 0.8);
          }
          
          form input {
            width: 100%;
            border-radius: 24px !important;
            border: 1px solid #e2e8f0;
            background: #ffffff;
          }
          
          button {
            width: 100%;
            white-space: normal;
            border-radius: 24px !important;
            margin-top: 4px;
          }
        }
        
        @media (max-width: 480px) {
          form {
            padding: 18px;
            gap: 14px;
            border-radius: 24px;
          }
          
          form input {
            padding: 12px 18px !important;
            font-size: 0.9rem !important;
            border-radius: 20px !important;
          }
          
          button {
            padding: 14px 20px !important;
            font-size: 0.9rem !important;
            border-radius: 20px !important;
          }
        }
        
        @media (min-width: 1280px) {
          form {
            max-width: 1100px;
            margin-left: auto;
            margin-right: auto;
            padding: 32px 36px;
          }
          
          form input {
            padding: 16px 28px !important;
            font-size: 1rem !important;
          }
          
          button {
            padding: 16px 44px !important;
            font-size: 1rem !important;
          }
        }
        
        @media (prefers-color-scheme: dark) {
          form input {
            background: #0f172a !important;
            border-color: #334155 !important;
            color: #f1f5f9 !important;
          }
          
          form input::placeholder {
            color: #64748b !important;
          }
          
          form {
            background: rgba(15, 23, 42, 0.92) !important;
            border-color: rgba(51, 65, 85, 0.8) !important;
            backdrop-filter: blur(16px);
          }
          
          button {
            background: linear-gradient(105deg, #f1f5f9, #cbd5e1) !important;
            color: #0f172a !important;
            box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.5) !important;
          }
          
          button:hover {
            background: linear-gradient(105deg, #ffffff, #e2e8f0) !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          form, form input, button {
            transition: none !important;
          }
          
          form input:focus, button:hover {
            transform: none !important;
          }
        }
      `}</style>
    </form>
  );
}

export default TaskForm;