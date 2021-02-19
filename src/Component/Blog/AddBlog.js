import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import CKEditor from "ckeditor4-react";
import { useAlert } from "react-alert";
import instance from "../../Instance";

const AddBlog = () => {
  const [text, setText] = useState("");

  const alert = useAlert();

  const [oneview, setOneView] = useState(null);

  useEffect(() => {
    instance
      .get(`/one/admin/view`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token$")}` },
      })
      .then(({ data }) => {
        console.log("admin", data);
        setOneView(data?.admin);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const [userDetails, setUserDetails] = useState({
    name: "",
    description: "",
    photo: null,
  });

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.id === "photo") {
      let file = event.target.files[0];
      setUserDetails((prevState) => {
        return {
          ...prevState,
          photo: file,
        };
      });
    } else {
      setUserDetails({
        ...userDetails,
        [event.target.id]: event.target.value,
      });
    }
  };

  const onAdd = (e) => {
    e.preventDefault();
    let data = new FormData();
    instance
      .post("/add/blog/post", {
        name: userDetails.name,
        description: text,
      })
      .then((result) => {
        console.log(result);
        data.set("customerId", result.data.result);

        data.append("blogImage", userDetails.photo);

        instance
          .put(`/blog/image/send`, data)
          .then(() => {
            console.log("Success");
          })
          .catch((err) => {
            console.log("Error", err);
          });
        console.log("Suceeess");
        alert.success("Blog Added");

        instance
          .post(`/add/notification`, {
            userId: userDetails?.name,
            category: "Added Blog",
            adminId: oneview?.fName,
          })
          .then(() => {
            console.log("Added Success");
          })
          .catch((err) => {
            console.log("Error in Added", err);
          });
        setUserDetails({
          name: "",
          description: "",
          photo: "",
        });
      })
      .catch((err) => {
        console.log("Errr", err);
      });
  };

  const editorConfig = {
    toolbar: [
      { name: "document", items: ["Print"] },
      { name: "clipboard", items: ["Undo", "Redo"] },
      { name: "styles", items: ["Format", "Font", "FontSize"] },
      {
        name: "basicstyles",
        items: [
          "Bold",
          "Italic",
          "Underline",
          "Strike",
          "RemoveFormat",
          "CopyFormatting",
        ],
      },
      { name: "colors", items: ["TextColor", "BGColor"] },
      {
        name: "paragraph",
        items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],
      },
      { name: "links", items: ["Link", "Unlink"] },
      {
        name: "paragraph",
        items: [
          "NumberedList",
          "BulletedList",
          "-",
          "Outdent",
          "Indent",
          "-",
          "Blockquote",
        ],
      },
      { name: "insert", items: ["Image", "Table", "PageBreak"] },
      { name: "tools", items: ["Maximize"] },
      { name: "editing", items: ["Scayt"] },
    ],
    extraPlugins: ["font", "print", "colorbutton", "justify", "copyformatting"],
  };

  return (
    <div>
      <Header />

      <div className="main-content-wrap sidenav-open d-flex flex-column">
        <h2>Add Blog</h2>
        <div className="row">
          <div className="col-md-6">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="email"
                className="mr-sm-2 text-left"
              >
                Name
              </label>
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter name"
                id="name"
                value={userDetails.name}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="col-md-6">
            <form>
              <label
                style={{ width: "300px" }}
                htmlFor="pwd"
                className="mr-sm-2 text-left"
              >
                Pictures
              </label>

              <input
                className="form-control mb-2 mr-sm-2"
                type="file"
                style={{ width: "300px" }}
                id="photo"
                onChange={handleChange}
                accept="image/*"
              />
            </form>
          </div>
        </div>
        <form>
          <label style={{ width: "100px" }} htmlFor="email" className="mr-sm-2">
            Description
          </label>
          <CKEditor
            className="pb-3"
            config={editorConfig}
            data={text}
            onChange={(e) => {
              setText(e.editor.getData());
            }}
          />
        </form>
        <br />
        <button
          onClick={onAdd}
          style={{ width: "200px" }}
          type="submit"
          className="btn btn-primary mb-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
