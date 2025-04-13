import React from 'react';

const Tasks = ({ tasks, onDelete, onEdit, onToggleComplete }) => {
    return (
        <>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`task ${task.completed ? 'completed' : ''}`}
                    style={{
                        background: task.completed ? '#e6ffe6' : '#f4f4f4',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleComplete(task.id)}
                            style={{ transform: 'scale(1.3)' }}
                        />
                        <div>
                            <h4 style={{
                                margin: 0,
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? '#555' : '#000'
                            }}>
                                {task.text}
                            </h4>
                            <p style={{ margin: 0 }}>{task.day}</p>
                            {task.completed && (
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#2e7d32' }}>
                                    ✅ Completada el: {task.completedAt}
                                </p>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => onEdit(task.id)}
                            style={{
                                backgroundColor: '#2196f3',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            style={{
                                backgroundColor: '#f44336',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Tasks;
