import { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [getResult, setGetResult] = useState(null);
  const [getId, setGetId] = useState('');
  const [getList, setGetList] = useState([]);

  const [postResult, setPostResult] = useState(null);
  const [postName, setPostName] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postColor, setPostColor] = useState('');

  const [putResult, setPutResult] = useState(null);
  const [putId, setPutId] = useState('');
  const [putName, setPutName] = useState('');
  const [putPrice, setPutPrice] = useState('');
  const [putColor, setPutColor] = useState('');

  const [deleteResult, setDeleteResult] = useState(null);
  const [deleteId, setDeleteId] = useState('');

  const [userResult, setUserResult] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [token, setToken] = useState('');


  const getAllData = () => {
    axios.get('http://localhost:1337/api/products').then((result) => {
      setGetResult(JSON.stringify(result.data.data, null, 2));
 
      let lista = result.data.data.map((product) => {
        return <li key={product.id}>{product.attributes.name}</li>;
      });
      setGetList(lista);
    });
  };

  /*tutaj też get all dla zamówień */
  const getAllOrders = () => {
    axios.get('http://localhost:1337/api/orders').then((result) => {
      setGetResult(JSON.stringify(result.data.data, null, 2));
 
      let lista = result.data.data.map((order) => {
        return <li key={order.id}>{order.attributes.orderDate}</li>;
      });
      setGetList(lista);
    });
  };


  const getDataById = () => {
    axios
      .get('http://localhost:1337/api/products/' + getId)
      .then((result) =>
        setGetResult(JSON.stringify(result.data.data, null, 2))
      );
  };

  const clearGetOutput = () => {
    setGetResult(null);
    setGetId('');
    setGetList([]);
  };

  const postData = () => {
    axios
      .post(
        'http://localhost:1337/api/products',
        {
          data: {
            name: postName,
            price: postPrice,
            color: postColor,
          },
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((result) => setPostResult(JSON.stringify(result, null, 2)));
  };

  const clearPostOutput = () => {
    setPostName('');
    setPostPrice('');
    setPostColor('');
    setPostResult(null);
  };

  const putData = () => {
    axios
      .put(
        'http://localhost:1337/api/products/' + putId,
        {
          data: {
            name: putName,
            price: putPrice,
            color: putColor,
          },
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((result) => setPutResult(JSON.stringify(result, null, 2)+ 'zmieniono dane'));
  };

  const clearPutOutput = () => {
    setPutId('');
    setPutName('');
    setPutPrice('');
    setPutColor('');
    setPutResult(null);
  };

  const deleteDataById = () => {
    axios
      .delete('http://localhost:1337/api/products/' + deleteId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((result) => setDeleteResult('usunięto dane'));
  };

  const clearDeleteOutput = () => {
    setDeleteId('');
    setDeleteResult(null);
  };

  const login = () => {
    axios
      .post('http://localhost:1337/api/auth/local', {
        identifier: userEmail,
        password: userPassword,
      })
      .then((result) => {
        setUserResult(JSON.stringify(result, null, 2));
        setToken(result.data.jwt);
      });
  };

  const clearUserOutput = () => {
    setUserEmail('');
    setUserPassword('');
    setUserResult(null);
  };

  return (
    <div id="app" className="container my-3">
      <h3>React API - Sklep</h3>

      <div className="card mt-3">
        <div className="card-header">React Axios GET</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllData}>
              Get All
            </button>

            <input
              type="text"
              className="form-control ms-2"
              placeholder="Id"
              onChange={(e) => setGetId(e.target.value)}
              value={getId}
            />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataById}>
                Get by Id
              </button>
            </div>

            <button
              className="btn btn-sm btn-warning ms-2"
              onClick={clearGetOutput}
            >
              Clear
            </button>
          </div>

          <div className="alert alert-secondary mt-2" role="alert">
            <pre>{getResult}</pre>
          </div>

          <ul>{getList}</ul>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Axios POST</div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              onChange={(e) => setPostName(e.target.value)}
              value={postName}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="price"
              onChange={(e) => setPostPrice(e.target.value)}
              value={postPrice}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="color"
              onChange={(e) => setPostColor(e.target.value)}
              value={postColor}
            />
          </div>
          <button className="btn btn-sm btn-primary" onClick={postData}>
            Post Data
          </button>
          <button
            className="btn btn-sm btn-warning ms-2"
            onClick={clearPostOutput}
          >
            Clear
          </button>

          <div className="alert alert-secondary mt-2" role="alert">
            <pre>{postResult}</pre>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Axios PUT</div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Id"
              onChange={(e) => setPutId(e.target.value)}
              value={putId}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              onChange={(e) => setPutName(e.target.value)}
              value={putName}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="price"
              onChange={(e) => setPutPrice(e.target.value)}
              value={putPrice}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="color"
              onChange={(e) => setPutColor(e.target.value)}
              value={putColor}
            />
          </div>

          <button className="btn btn-sm btn-primary" onClick={putData}>
            Update Data
          </button>
          <button
            className="btn btn-sm btn-warning ms-2"
            onClick={clearPutOutput}
          >
            Clear
          </button>

          <div className="alert alert-secondary mt-2" role="alert">
            <pre>{postResult}</pre>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Axios DELETE</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Id"
              onChange={(e) => setDeleteId(e.target.value)}
              value={deleteId}
            />
            <div className="input-group-append">
              <button
                className="btn btn-sm btn-danger"
                onClick={deleteDataById}
              >
                Delete by Id
              </button>
            </div>

            <button
              className="btn btn-sm btn-warning ms-2"
              onClick={clearDeleteOutput}
            >
              Clear
            </button>
          </div>

          <div className="alert alert-secondary mt-2" role="alert">
            <pre>{deleteResult}</pre>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">Logowanie</div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="email"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="password"
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
            />
          </div>
          <button className="btn btn-sm btn-primary" onClick={login}>
            LogIn
          </button>
          <button
            className="btn btn-sm btn-warning ms-2"
            onClick={clearUserOutput}
          >
            Clear
          </button>

          <div className="alert alert-secondary mt-2" role="alert">
            <pre>{userResult}</pre>
          </div>
        </div>
      </div>
    
      <div className="card mt-3">
        <div className="card-header">React Axios GET Order</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllOrders}>
              Get All
            </button>

          </div>

          <div className="alert alert-secondary mt-2" role="alert">
            <pre>{getResult}</pre>
          </div>

          <ul>{getList}</ul>
        </div>
      </div>

    </div>
  );
}

export default App;
