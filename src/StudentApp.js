import React, { useState, useEffect } from "react";

const StudentApp = () => {
  const [students, setStudents] = useState(() => {
    return JSON.parse(localStorage.getItem("students")) || [];
  });
  const [form, setForm] = useState({ roll: "", name: "", marks: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = form;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, form]);
    }
    setForm({ roll: "", name: "", marks: "" });
  };

  const handleEdit = (index) => {
    setForm(students[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };
// webhoobssssgit
  // Custom Feature 1: Calculate average marks
  const average =
    students.length > 0
      ? (
          students.reduce((acc, s) => acc + Number(s.marks), 0) / students.length
        ).toFixed(2)
      : 0;

  // Custom Feature 2: Highlight top scorer
  const topMark = Math.max(...students.map((s) => Number(s.marks)), 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>🎓 Student Marks Management System</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="roll"
          placeholder="Roll No"
          value={form.roll}
          onChange={handleChange}
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="marks"
          placeholder="Marks"
          value={form.marks}
          onChange={handleChange}
        />
        <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
      </form>

      <h3>Student Records</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr
              key={i}
              style={{
                backgroundColor: Number(s.marks) === topMark ? "#ffe082" : "",
              }}
            >

              <td>{s.roll}</td>
              <td>{s.name}</td>
              <td>{s.marks}</td>
              <td>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Average Marks: {average}</h4>
    </div>
  );
};

export default StudentApp;
