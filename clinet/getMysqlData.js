async function getData(id) {
  try {
    const response = await fetch(
      id ? `http://localhost:3000/${id}` : "http://localhost:3000/"
    );
    const data = await response.json();

    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    data.forEach((user) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${user.ID}</td>
          <td>${user.Name}</td>
          <td>${user.Email}</td>
          <td>${user.Age}</td>
          <td>
            <img width="50px" src="data:image/png;base64,${toBase64(
              user.ProfilePicture.data
            )}"/>
          </td>
        `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function toBase64(arr) {
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

function getAllData() {
  getData();
}

function getIdInput() {
  const id = document.getElementById("getIdInput").value;
  getData(id);
}

getData()