var db = require('pg');
const { Pool, Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'db-finance-peer',
  password: '1234',
  port: 5432,
});
client.connect();
var usr = 

module.exports = {
    Users: {
        findByEmail : (email, callback) => {
            client.query("SELECT \"UserEmail\", \"UserName\", \"UserPassword\", \"UserId\" FROM public.\"FUsers\" Where \"UserEmail\" =  $1", [email], (err, res) => {
                if(err) return callback(err);
                if(!res.rows.length) return callback(null, null);
                var row = res.rows[0];
                callback(null, {id: row.UserId, name: row.UserName, email: row.UserEmail, password: row.UserPassword });
            })
        },
        insert : (email, name, pass, callback) => {
            client.query("INSERT INTO public.\"FUsers\" (\"UserEmail\", \"UserName\", \"UserPassword\") VALUES ($1, $2, $3);", [email, name, pass], callback)
        }
    },
    Files: {
        findById : (id, callback) => {
            client.query('SELECT "Name", "Id", "UserId", "Content" FROM public."Files" Where "Id" = $1', [id], (err, res) => { 
                if(err) return callback(err);
                if(!res.rows.length) return callback(null, null);

                var row = res.rows[0];
                callback(null, {id: row.Id, name: row.Name, userId: row.UserId, content: row.Content });
            })
        },
        insert: (name, userId, content, callback) => {
            client.query('INSERT INTO public."Files"("Name", "UserId", "Content") VALUES ($1, $2, $3);', [name, userId, content], callback);
        },
        findByUserId : (userId, callback) => {
            client.query('SELECT "Name", "Id", "UserId" FROM public."Files" Where "UserId" = $1', [userId], (err, res) => {
                if(err) return callback(err);
                if(!res.rows.length) return callback(null, null);

                callback(null, res.rows.map(row => { return {id: row.Id, name: row.Name, userId: row.UserId } }));
            })
        }
    }
}