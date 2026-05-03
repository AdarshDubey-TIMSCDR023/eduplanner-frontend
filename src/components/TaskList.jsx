// TaskList.jsx
import { useState } from "react";
import { updateTask, deleteTask } from "../services/api";

function TaskList({ tasks, refresh }) {

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: ""
  });

  const completeTask = async (id) => {

    await updateTask(id, {
      status: "Completed"
    });

    refresh();
  };

  const removeTask = async (id) => {

    await deleteTask(id);

    refresh();
    setDeleteConfirm(null);
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setEditFormData({
      title: task.title || "",
      description: task.description || "",
      deadline: task.deadline ? (task.deadline.slice ? task.deadline.slice(0,10) : String(task.deadline).slice(0,10)) : "",
      status: task.status || "Yet to Start"
    });
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditFormData({
      title: "",
      description: "",
      deadline: "",
      status: ""
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const saveEdit = async () => {
    await updateTask(editingTask._id, {
      title: editFormData.title,
      description: editFormData.description,
      deadline: editFormData.deadline,
      status: editFormData.status
    });
    refresh();
    cancelEditing();
  };

  // Helper function to safely format deadline
  const formatDeadline = (deadline) => {
    if (!deadline) return "No deadline";
    if (typeof deadline === 'string') return deadline.slice(0,10);
    if (deadline instanceof Date) return deadline.toISOString().slice(0,10);
    return String(deadline).slice(0,10);
  };

  // Helper function to safely get description text
  const getDescription = (description) => {
    if (!description) return "No description";
    if (typeof description === 'string') return description;
    if (typeof description === 'object') return JSON.stringify(description);
    return String(description);
  };

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
        gap: 'clamp(1.25rem, 3vw, 2rem)',
        padding: 'clamp(0.5rem, 2vw, 1rem)'
      }}>
        {tasks && tasks.map(task => (
          <div 
            className="task" 
            key={task._id}
            style={{
              background: task.status === "Completed" 
                ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                : task.status === "In Progress"
                ? 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              padding: 'clamp(1.25rem, 3vw, 1.75rem)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(203, 213, 225, 0.4)',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 35px -12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)';
            }}
          >
            {/* Status Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              background: task.status === "Completed" 
                ? 'rgba(34, 197, 94, 0.15)' 
                : task.status === "In Progress"
                ? 'rgba(249, 115, 22, 0.15)'
                : 'rgba(59, 130, 246, 0.15)',
              color: task.status === "Completed" 
                ? '#166534' 
                : task.status === "In Progress"
                ? '#9a3412'
                : '#1e40af'
            }}>
              {task.status === "Completed" ? "COMPLETED" : task.status === "In Progress" ? "IN PROGRESS" : "YET TO START"}
            </div>

            {/* Delete Button */}
            <button 
              onClick={() => setDeleteConfirm(task._id)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(244, 67, 54, 0.9)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 8px rgba(244, 67, 54, 0.3)',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = '#ef4444';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(244, 67, 54, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(244, 67, 54, 0.9)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(244, 67, 54, 0.3)';
              }}
              title="Delete task"
            >
              ✕
            </button>

            {/* Display Mode */}
            <>
              <h3 style={{
                margin: '1.5rem 0 0.75rem 0',
                paddingRight: '40px',
                color: '#0f172a',
                fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)',
                fontWeight: '700',
                letterSpacing: '-0.3px',
                wordBreak: 'break-word'
              }}>{task.title || "Untitled Task"}</h3>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: '500',
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Description
                </span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: 'linear-gradient(90deg, #e2e8f0, transparent)'
                }} />
              </div>
              
              <p style={{
                color: '#475569',
                lineHeight: '1.6',
                margin: '0 0 1.25rem 0',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                wordBreak: 'break-word'
              }}>{getDescription(task.description)}</p>
              
              <div style={{
                margin: '0.75rem 0',
                padding: 'clamp(0.6rem, 2vw, 0.8rem)',
                background: 'rgba(0, 0, 0, 0.02)',
                borderRadius: '16px',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)',
                border: '1px solid rgba(203, 213, 225, 0.3)'
              }}>
                <p style={{ margin: '0.35rem 0', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: '600' }}>Deadline:</span> 
                  <span style={{ 
                    fontWeight: '500',
                    background: '#f1f5f9',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>{formatDeadline(task.deadline)}</span>
                </p>
                <p style={{ margin: '0.35rem 0', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: '600' }}>Status:</span>
                  <select 
                    value={task.status}
                    onChange={async (e) => {
                      await updateTask(task._id, {
                        status: e.target.value
                      });
                      refresh();
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '24px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: task.status === "Completed" 
                        ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
                        : task.status === "In Progress"
                        ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                        : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    }}
                  >
                    <option value="Yet to Start" style={{ background: '#3b82f6', color: 'white' }}>Yet to Start</option>
                    <option value="In Progress" style={{ background: '#f59e0b', color: 'white' }}>In Progress</option>
                    <option value="Completed" style={{ background: '#22c55e', color: 'white' }}>Completed</option>
                  </select>
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                gap: 'clamp(0.75rem, 2vw, 1rem)',
                marginTop: 'auto',
                paddingTop: '1.25rem',
                flexDirection: 'row'
              }}>
                <button 
                  onClick={() => completeTask(task._id)}
                  disabled={task.status === "Completed"}
                  style={{
                    flex: 1,
                    padding: 'clamp(0.65rem, 2vw, 0.75rem)',
                    background: task.status === "Completed" 
                      ? '#cbd5e1' 
                      : 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '40px',
                    cursor: task.status === "Completed" ? 'not-allowed' : 'pointer',
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.85rem)',
                    fontWeight: '600',
                    transition: 'all 0.25s ease',
                    opacity: task.status === "Completed" ? 0.5 : 1,
                    whiteSpace: 'nowrap',
                    boxShadow: task.status === "Completed" ? 'none' : '0 2px 8px rgba(34, 197, 94, 0.3)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    if (task.status !== "Completed") {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (task.status !== "Completed") {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 197, 94, 0.3)';
                    }
                  }}
                >
                  Complete
                </button>
                
                <button 
                  onClick={() => startEditing(task)}
                  style={{
                    flex: 1,
                    padding: 'clamp(0.65rem, 2vw, 0.75rem)',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '40px',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.85rem)',
                    fontWeight: '600',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  Edit
                </button>
              </div>
            </>
          </div>
        ))}
      </div>

      {/* Edit Modal - Popup */}
      {editingTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          padding: 'clamp(1rem, 5vw, 2rem)',
          animation: 'fadeIn 0.2s ease'
        }} onClick={cancelEditing}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'clamp(32px, 5vw, 48px)',
            padding: 'clamp(28px, 5vw, 42px)',
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.4)',
            animation: 'slideUp 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
            transition: 'all 0.3s ease'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'clamp(24px, 4vw, 32px)',
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: 'clamp(16px, 3vw, 20px)'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: 'clamp(1.6rem, 5vw, 2rem)',
                fontWeight: '800',
                color: '#1e293b',
                letterSpacing: '-0.5px'
              }}>
                Edit Task
              </h3>
              <button
                onClick={cancelEditing}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease',
                  color: '#64748b',
                  fontWeight: 'bold'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fee2e2';
                  e.currentTarget.style.color = '#ef4444';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ✕
              </button>
            </div>

            {/* Title Input */}
            <div style={{ marginBottom: 'clamp(20px, 3.5vw, 24px)' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '700',
                color: '#1e293b',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
                letterSpacing: '0.3px'
              }}>
                Task Title
              </label>
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                placeholder="Enter task title"
                style={{
                  width: '100%',
                  padding: 'clamp(14px, 2.5vw, 16px) clamp(18px, 3vw, 22px)',
                  borderRadius: '24px',
                  border: '2px solid #e2e8f0',
                  fontSize: '1rem',
                  fontWeight: '500',
                  background: '#ffffff',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Description Input */}
            <div style={{ marginBottom: 'clamp(20px, 3.5vw, 24px)' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: '700',
                color: '#1e293b',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
                letterSpacing: '0.3px'
              }}>
                Description
              </label>
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                placeholder="Enter task description"
                rows="3"
                style={{
                  width: '100%',
                  padding: 'clamp(14px, 2.5vw, 16px) clamp(18px, 3vw, 22px)',
                  borderRadius: '24px',
                  border: '2px solid #e2e8f0',
                  fontSize: '0.95rem',
                  background: '#ffffff',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Deadline and Status Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(16px, 3vw, 20px)',
              marginBottom: 'clamp(28px, 5vw, 36px)'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '700',
                  color: '#1e293b',
                  fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
                  letterSpacing: '0.3px'
                }}>
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={editFormData.deadline}
                  onChange={handleEditChange}
                  style={{
                    width: '100%',
                    padding: 'clamp(14px, 2.5vw, 16px) clamp(18px, 3vw, 22px)',
                    borderRadius: '24px',
                    border: '2px solid #e2e8f0',
                    fontSize: '0.95rem',
                    background: '#ffffff',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '700',
                  color: '#1e293b',
                  fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
                  letterSpacing: '0.3px'
                }}>
                  Status
                </label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditChange}
                  style={{
                    width: '100%',
                    padding: 'clamp(14px, 2.5vw, 16px) clamp(18px, 3vw, 22px)',
                    borderRadius: '24px',
                    border: '2px solid #e2e8f0',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    background: editFormData.status === "Completed" ? '#f0fdf4' : 
                               editFormData.status === "In Progress" ? '#fff7ed' : '#f8fafc',
                    color: editFormData.status === "Completed" ? '#166534' : 
                           editFormData.status === "In Progress" ? '#9a3412' : '#1e293b',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                >
                  <option value="Yet to Start" style={{ background: '#f8fafc', color: '#1e293b' }}>Yet to Start</option>
                  <option value="In Progress" style={{ background: '#fff7ed', color: '#9a3412' }}>In Progress</option>
                  <option value="Completed" style={{ background: '#f0fdf4', color: '#166534' }}>Completed</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: 'clamp(16px, 3vw, 20px)',
              justifyContent: 'flex-end',
              marginTop: 'clamp(8px, 2vw, 12px)'
            }}>
              <button
                onClick={cancelEditing}
                style={{
                  padding: 'clamp(12px, 2vw, 14px) clamp(28px, 4vw, 36px)',
                  background: 'linear-gradient(135deg, #94a3b8, #64748b)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '48px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                  transition: 'all 0.25s ease',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 8px rgba(100, 116, 139, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(100, 116, 139, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(100, 116, 139, 0.2)';
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                style={{
                  padding: 'clamp(12px, 2vw, 14px) clamp(32px, 5vw, 42px)',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '48px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(34, 197, 94, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.4)';
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 'clamp(1rem, 5vw, 2rem)'
        }} onClick={() => setDeleteConfirm(null)}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'clamp(20px, 5vw, 32px)',
            padding: 'clamp(1.8rem, 5vw, 2.5rem)',
            maxWidth: '480px',
            width: '90%',
            boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.4)',
            animation: 'slideIn 0.3s ease',
            textAlign: 'center'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Icon */}
            <div style={{
              width: '70px',
              height: '70px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#dc2626'
            }}>
              !
            </div>

            <h3 style={{
              margin: '0 0 12px 0',
              color: '#1e293b',
              fontSize: 'clamp(1.35rem, 4vw, 1.65rem)',
              fontWeight: '800'
            }}>Are you sure?</h3>
            
            <p style={{
              color: '#64748b',
              marginBottom: '1.8rem',
              lineHeight: '1.6',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
            }}>
              Do you really want to delete this task? This action cannot be undone.
            </p>
            
            <div style={{
              display: 'flex',
              gap: 'clamp(1rem, 3vw, 1.25rem)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: 'clamp(0.6rem, 2vw, 0.75rem) clamp(1.5rem, 4vw, 2rem)',
                  background: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '40px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={() => removeTask(deleteConfirm)}
                style={{
                  padding: 'clamp(0.6rem, 2vw, 0.75rem) clamp(1.5rem, 4vw, 2rem)',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '40px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)';
                }}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .task div:last-child {
            flex-direction: column;
          }
          
          button {
            white-space: normal !important;
            width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .task div:last-child {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          button {
            white-space: normal !important;
            width: 100%;
          }
          
          select {
            margin-left: 0 !important;
            margin-top: 0.25rem;
            display: inline-block;
            width: auto;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .task {
            background: linear-gradient(135deg, #1e293b, #0f172a) !important;
            border-color: #334155 !important;
          }
          
          .task h3 {
            color: #f1f5f9 !important;
          }
          
          .task p, .task div p {
            color: #94a3b8 !important;
          }
          
          .task div div {
            background: rgba(255, 255, 255, 0.05) !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
          }
          
          /* Edit Modal Dark Mode */
          div[style*="background: #ffffff"][style*="border-radius"] {
            background: linear-gradient(145deg, #1e293b, #0f172a) !important;
          }
          
          div[style*="background: #ffffff"] label {
            color: #cbd5e1 !important;
          }
          
          div[style*="background: #ffffff"] input,
          div[style*="background: #ffffff"] textarea,
          div[style*="background: #ffffff"] select {
            background: #334155 !important;
            border-color: #475569 !important;
            color: #f1f5f9 !important;
          }
          
          div[style*="background: #ffffff"] input::placeholder,
          div[style*="background: #ffffff"] textarea::placeholder {
            color: #94a3b8 !important;
          }
          
          div[style*="background: #ffffff"] h3 {
            color: #f1f5f9 !important;
          }
        }
        
        /* Touch-friendly adjustments for mobile */
        @media (hover: none) and (pointer: coarse) {
          button, select {
            min-height: 48px;
          }
          
          select {
            padding: 0.5rem 0.75rem !important;
          }
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .task, button, select, .modal-content {
            transition: none !important;
            animation: none !important;
          }
          
          .task:hover {
            transform: none !important;
          }
        }
        
        /* Improved focus states */
        button:focus-visible, select:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}

export default TaskList;