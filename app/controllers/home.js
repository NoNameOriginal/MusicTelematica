var express = require('express'),
  router = express.Router(),
  db = require('../models'),
  mysql = require('mysql');


module.exports = function (app) {
  app.use('/', router);
};

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'musica'
});
router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM articles', function (err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    res.render('index', {
      titulo: 'Esto es un titulo',
      data: rows
    });
  });
});

router.post('/Ingresar', function (req, res, next) {
  connection.query('SELECT * FROM usuarios where usuario="' + req.body.user + '" and password="' + req.body.pass + '"', function (err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    var a;
    a = rows
    connection.query('SELECT * from canciones where idusuario=' + a[0].id.toString(),
      function (err, rows2) {
        if (err) throw err;
        res.render('principal', {
          lista: rows2,
          data: rows
        })
      });
  });
});
router.post('/Registrar', function (req, res, next) {
  res.render('registrar', {});
});
router.post('/Guardar', function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    nombres: input.nombres,
    apellidos: input.apellidos,
    usuario: input.user,
    password: input.pass,
    compartidos: ""
  };
  connection.query('INSERT INTO usuarios SET ?', data,
    function (err, result) {
      if (err) throw err;
    }
  );
  res.redirect("/")
});

router.post('/Crear', function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    nombreCancion: input.nCancion,
    artista: input.artista,
    album: input.album,
    tamaño: input.tama,
    tipo: input.tipo,
    idusuario: input.id
  };
  connection.query('INSERT INTO canciones SET ?', data,
    function (err, result) {
      if (err) throw err;
    }
  );
  connection.query('SELECT * FROM usuarios where usuario="' + req.body.user + '" and password="' + req.body.pass + '"', function (err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    var a;
    a = rows
    connection.query('SELECT * from canciones where idusuario=' + a[0].id.toString(),
      function (err, rows2) {
        if (err) throw err;
        res.render('principal', {
          lista: rows2,
          data: rows
        })
      });
  });
});
router.post('/VistaEditar', function (req, res, next) {
  connection.query('SELECT * from canciones where id=' + req.body.id,
    function (err, rows) {
      if (err) throw err;
      res.render('edit', {
        data: rows
      })
    });
});
router.post('/EditarPerfil', function (req, res, next) {
  connection.query('SELECT * from usuarios where id=' + req.body.id,
    function (err, rows) {
      if (err) throw err;
      res.render('editarPerfil', {
        data: rows
      })
    });
});
router.post('/Update', function (req, res, next) {
  // res.send(req.body)
  var input = JSON.parse(JSON.stringify(req.body))
  var data = {
    nombreCancion: input.nCancion, artista: input.artisita, album: input.album, tamaño: input.tama, tipo: input.tipo
  }
  connection.query('UPDATE canciones SET ? WHERE id=' + input.id, data,
    function (err, rows) {
      if (err) throw err;
      connection.query('SELECT * FROM usuarios where id=' + req.body.user, function (err, rows2) {
        if (err)
          console.log("Error Selecting : %s ", err);
        var a;
        a = rows2
        connection.query('SELECT * from canciones where idusuario=' + a[0].id,
          function (err, rows3) {
            if (err) throw err;
            res.render('principal', {
              lista: rows3,
              data: rows2
            })
          });
      });
    });
});
router.post('/UpdatePerfil', function (req, res, next) {
  // res.send(req.body)
  var input = JSON.parse(JSON.stringify(req.body))
  var data = {
    nombres: input.nombre, apellidos: input.apellidos, usuario: input.user, password: input.pass
  }
  connection.query('UPDATE usuarios SET ? WHERE id=' + input.id, data,
    function (err, rows) {
      if (err) throw err;
      connection.query('SELECT * FROM usuarios where id=' + input.id, function (err, rows2) {
        if (err)
          console.log("Error Selecting : %s ", err);
        var a;
        a = rows2
        connection.query('SELECT * from canciones where idusuario=' + a[0].id,
          function (err, rows3) {
            if (err) throw err;
            res.render('principal', {
              lista: rows3,
              data: rows2
            })
          });
      });
    });
});
router.post('/Eliminar', function (req, res, next) {
  connection.query('DELETE FROM canciones where id=' + req.body.id, function (err, result) {
    if (err) throw err;
  }
  );
  connection.query('SELECT * FROM usuarios where id=' + req.body.user, function (err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    var a;
    a = rows
    connection.query('SELECT * from canciones where idusuario=' + a[0].id,
      function (err, rows2) {
        if (err) throw err;
        res.render('principal', {
          lista: rows2,
          data: rows
        })
      });
  });
});
router.post('/Buscar', function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body))
  connection.query('SELECT * FROM usuarios where id=' + input.id, function (err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    var a;
    a = rows
    connection.query("SELECT * FROM canciones WHERE (nombreCancion LIKE '%" + input.busqueda + "%' OR artista LIKE '%" + input.busqueda + "%' OR album LIKE '%" + input.busqueda + "%' OR tamaño LIKE '%" + input.busqueda + "%' OR tipo LIKE '%" + input.busqueda + "%') AND idusuario=" + a[0].id.toString(),
      function (err, rows2) {
        if (err) throw err;
        res.render('principal', {
          lista: rows2,
          data: rows
        })
      });
  });
});
router.post('/Compartir', function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body))
  connection.query('SELECT * FROM usuarios', function (err, rows) {
    var lista;
    for (var i = 0; i < rows.length; i++) {
      rows[i]["data"] = input.id;
    }
    lista = rows;
    res.render('compartir', {
      lista: lista
    })
  });
});
router.post('/ICompartir', function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body))
  var data = {
    idUsuario: input.idCompartido,
    idCompartidos: input.id
  };
  connection.query('INSERT INTO compartidos SET ?', data,
    function (err, result) {
      if (err) throw err;
    }

  );
  connection.query('SELECT * FROM usuarios where id=' + input.idCompartido, function (err, rows2) {
    if (err)
      console.log("Error Selecting : %s ", err);
    var a;
    a = rows2
    connection.query('SELECT * from canciones where idusuario=' + a[0].id,
      function (err, rows3) {
        if (err) throw err;

        res.render('principal', {
          lista: rows3,
          data: rows2
        })
      });
  });
});
router.post('/CompartirCon', function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  connection.query('SELECT * FROM usuarios u INNER JOIN compartidos c ON u.id = c.idUsuario where u.id=' + input.id, function (err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
     res.render('Compartidos', {
       lista: rows
     })
  });
});
router.post('/ECompartir', function (req, res, next) {
  connection.query('DELETE FROM compartidos where id=' + req.body.id, function (err, result) {
    if (err) throw err;
  }
  );
  connection.query('SELECT * FROM usuarios where id=' + req.body.user, function (err, rows) {
    if (err)
      console.log("Error Selecting : %s ", err);
    var a;
    a = rows
    connection.query('SELECT * from canciones where idusuario=' + a[0].id,
      function (err, rows2) {
        if (err) throw err;
        res.render('principal', {
          lista: rows2,
          data: rows
        })
      });
  });
});