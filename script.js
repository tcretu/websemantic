$(document).ready(function () {
  // Scrape JSON-LD
  $("#scrapeJsonLd").click(function () {
    $.ajax({
      url: "scraperLd.php",
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response.error) {
          $("#results").html("<pre>Error: " + response.error + "</pre>");
          return;
        }
        let table = '<table border="1"><tr><th>Article Name</th></tr>';
        let articleDropdown = "";
        response.forEach(function (item) {
          table += "<tr>";
          table += "<td>" + item.article_name + "</td>";
          table += "</tr>";
          articleDropdown += `<option value="${item.article_name}">${item.article_name}</option>`;
        });
        table += "</table>";
        $("#results").html(table);
        $("#articleDropdown").html(articleDropdown);
      },
      error: function (xhr, status, error) {
        $("#results").html("<pre>Error scraping JSON-LD: " + error + "</pre>");
      },
    });
  });

  // Insert RDF record
  $("#insertRdf").click(function () {
    const formData = {
      article: $("#articleDropdown").val(),
      author: $("#author").val(),
      description: $("#description").val(),
    };

    $.ajax({
      url: "insertRdf.php",
      type: "POST",
      data: formData,
      success: function (response) {
        $("#rdfResults").html(response);
      },
      error: function (xhr, status, error) {
        $("#rdfResults").html("<pre>Error adding record: " + error + "</pre>");
      },
    });
  });

  // Function to query and display RDF4J table
  $("#queryRdf").click(function () {
    $.ajax({
      url: "queryRdf.php",
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response.error) {
          $("#rdfResults").html("<pre>Error: " + response.error + "</pre>");
          return;
        }
        let table =
          '<table border="1"><tr><th>Article Name</th><th>Author</th><th>Description</th></tr>';
        response.forEach(function (item) {
          table += "<tr>";
          table += "<td>" + item.article + "</td>";
          table += "<td>" + item.author + "</td>";
          table += "<td>" + item.description + "</td>";
          table += "</tr>";
        });
        table += "</table>";
        $("#rdfResults").html(table);
      },
      error: function (xhr, status, error) {
        $("#rdfResults").html("<pre>Error querying RDF4J: " + error + "</pre>");
      },
    });
  });

  $("#deleteRdf").click(function () {
    const formData = {
      article: $("#articleDropdown").val(),
      author: $("#author").val(),
      description: $("#description").val(),
    };

    $.ajax({
      url: "deleteRdf.php",
      type: "POST",
      data: formData,
      success: function (response) {
        $("#rdfResults").html(response);
        // Optionally, refresh the RDF4J table here
      },
      error: function (xhr, status, error) {
        $("#rdfResults").html(
          "<pre>Error deleting record: " + error + "</pre>"
        );
      },
    });
  });
  $("#clearRepo").click(function () {
    $.ajax({
      url: "clearRepo.php",
      type: "POST",
      success: function (response) {
        $("#rdfResults").html(response);
        // Optionally, refresh the RDF4J table here
      },
      error: function (xhr, status, error) {
        $("#rdfResults").html(
          "<pre>Error clearing repository: " + error + "</pre>"
        );
      },
    });
  });

  $("#insertJson").click(function () {
    const formData = {
      article: $("#articleDropdown").val(),
      author: $("#author").val(),
      description: $("#description").val(),
    };

    $.ajax({
      url: "insertJson.php",
      type: "POST",
      data: formData,
      success: function (response) {
        $("#jsonResults").html(response);
        // Optionally, refresh the JSON table here
      },
      error: function (xhr, status, error) {
        $("#jsonResults").html("<pre>Error adding record: " + error + "</pre>");
      },
    });
  });

  // Query JSON records
  $("#queryJson").click(function () {
    $.ajax({
      url: "queryJson.php",
      type: "GET",
      success: function (response) {
        const records = JSON.parse(response);
        if (!records.length) {
          $("#jsonResults").html("<pre>No records found.</pre>");
          return;
        }
        let table =
          '<table border="1"><tr><th>Article Name</th><th>Author</th><th>Description</th></tr>';
        records.forEach(function (item) {
          table += "<tr>";
          table += "<td>" + item.article + "</td>";
          table += "<td>" + item.author + "</td>";
          table += "<td>" + item.description + "</td>";
          table += "</tr>";
        });
        table += "</table>";
        $("#jsonResults").html(table);
      },
      error: function (xhr, status, error) {
        $("#jsonResults").html(
          "<pre>Error querying JSON server: " + error + "</pre>"
        );
      },
    });
  });
});
$(document).ready(function () {
  // Scrape JSON-LD
  $("#scrapeJsonLd").click(function () {
    $.ajax({
      url: "scraperLd.php",
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response.error) {
          $("#results").html("<pre>Error: " + response.error + "</pre>");
          return;
        }
        let table = '<table border="1"><tr><th>Article Name</th></tr>';
        let articleDropdown = "";
        response.forEach(function (item) {
          table += "<tr>";
          table += "<td>" + item.article_name + "</td>";
          table += "</tr>";
          articleDropdown += `<option value="${item.article_name}">${item.article_name}</option>`;
        });
        table += "</table>";
        $("#results").html(table);
        $("#articleDropdown").html(articleDropdown);
      },
      error: function (xhr, status, error) {
        $("#results").html("<pre>Error scraping JSON-LD: " + error + "</pre>");
      },
    });
  });

  // Insert RDF record
  $("#insertRdf").click(function () {
    const formData = {
      article: $("#articleDropdown").val(),
      author: $("#author").val(),
      description: $("#description").val(),
    };

    $.ajax({
      url: "insertRdf.php",
      type: "POST",
      data: formData,
      success: function (response) {
        $("#rdfResults").html(response);
      },
      error: function (xhr, status, error) {
        $("#rdfResults").html("<pre>Error adding record: " + error + "</pre>");
      },
    });
  });

  // Function to query and display RDF4J table
  $("#queryRdf").click(function () {
    $.ajax({
      url: "queryRdf.php",
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response.error) {
          $("#rdfResults").html("<pre>Error: " + response.error + "</pre>");
          return;
        }
        let table =
          '<table border="1"><tr><th>Article Name</th><th>Author</th><th>Description</th></tr>';
        response.forEach(function (item) {
          table += "<tr>";
          table += "<td>" + item.article + "</td>";
          table += "<td>" + item.author + "</td>";
          table += "<td>" + item.description + "</td>";
          table += "</tr>";
        });
        table += "</table>";
        $("#rdfResults").html(table);
      },
      error: function (xhr, status, error) {
        $("#rdfResults").html("<pre>Error querying RDF4J: " + error + "</pre>");
      },
    });
  });

  // Delete RDF record
  $("#deleteRdf").click(function () {
    const formData = {
      article: $("#articleDropdown").val(),
      author: $("#author").val(),
      description: $("#description").val(),
    };

    $.ajax({
      url: "deleteRdf.php",
      type: "POST",
      data: formData,
      success: function (response) {
        $("#rdfResults").html(response);
        // Optionally, refresh the RDF4J table here
      },
      error: function (xhr, status, error) {
        $("#rdfResults").html(
          "<pre>Error deleting record: " + error + "</pre>"
        );
      },
    });
  });

  // Clear the entire RDF4J repository
  $("#clearRepo").click(function () {
    $.ajax({
      url: "clearRepo.php",
      type: "POST",
      success: function (response) {
        $("#rdfResults").html(response);
        // Optionally, refresh the RDF4J table here
      },
      error: function (xhr, status, error) {
        $("#rdfResults").html(
          "<pre>Error clearing repository: " + error + "</pre>"
        );
      },
    });
  });

  // Insert JSON record
  $("#insertJson").click(function () {
    const formData = {
      article: $("#articleDropdown").val(),
      author: $("#author").val(),
      description: $("#description").val(),
    };

    $.ajax({
      url: "insertJson.php",
      type: "POST",
      data: formData,
      success: function (response) {
        $("#jsonResults").html(response);
        // Optionally, refresh the JSON table here
      },
      error: function (xhr, status, error) {
        $("#jsonResults").html("<pre>Error adding record: " + error + "</pre>");
      },
    });
  });

  // Query JSON records
  $("#queryJson").click(function () {
    $.ajax({
      url: "queryJson.php",
      type: "GET",
      success: function (response) {
        try {
          const records = JSON.parse(response);
          if (!records.length) {
            $("#jsonResults").html("<pre>No records found.</pre>");
            return;
          }
          let table =
            '<table border="1"><tr><th>Article Name</th><th>Author</th><th>Description</th></tr>';
          records.forEach(function (item) {
            table += "<tr>";
            table += "<td>" + item.article + "</td>";
            table += "<td>" + item.author + "</td>";
            table += "<td>" + item.description + "</td>";
            table += "</tr>";
          });
          table += "</table>";
          $("#jsonResults").html(table);
        } catch (e) {
          $("#jsonResults").html(
            "<pre>Error parsing JSON response: " + e.message + "</pre>"
          );
        }
      },
      error: function (xhr, status, error) {
        $("#jsonResults").html(
          "<pre>Error querying JSON server: " + error + "</pre>"
        );
      },
    });
  });
});
