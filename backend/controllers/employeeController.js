const db = require('../db');

exports.addEmployee = (req, res) => {
  const { name, employeeId, department, designation, project, type, status } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = 'INSERT INTO employees (name, employeeId, department, designation, project, type, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, employeeId, department, designation, project, type, status, image], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Employee added successfully' });
  });
};

exports.getEmployees = (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};


exports.deleteEmployee = (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Employee deleted successfully' });
    });
  };
  
  exports.getEmployeeById = (req, res) => {
    const sql = 'SELECT * FROM employees WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    });
  };
  
  exports.updateEmployee = (req, res) => {
    const id = req.params.id;
    const { name, employeeId, department, designation, project, type, status } = req.body;
    const image = req.file ? req.file.filename : null;
  
    let sql, params;
  
    if (image) {
      sql = `UPDATE employees SET name=?, employeeId=?, department=?, designation=?, project=?, type=?, status=?, image=? WHERE id=?`;
      params = [name, employeeId, department, designation, project, type, status, image, id];
    } else {
      sql = `UPDATE employees SET name=?, employeeId=?, department=?, designation=?, project=?, type=?, status=? WHERE id=?`;
      params = [name, employeeId, department, designation, project, type, status, id];
    }
  
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ error: "Failed to update employee" });
      }
      res.json({ message: 'Employee updated successfully' });
    });
  };
  