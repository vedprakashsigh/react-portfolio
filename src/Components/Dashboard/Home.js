import { useRef } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
  const Form = useRef();

  const submitProject = (e) => {
    e.preventDefault();

    const title = Form.current?.title.value;
    const description = Form.current?.description.value;
    const techStack = Form.current?.techStack.value;
    const url = Form.current?.url.value;
    const image = Form.current?.image.files[0];

    const storageRef = ref(storage, `projects/${image.name}`);

    uploadBytes(storageRef, image).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then(
          (downloadURL) => {
            saveProject({
              title,
              description,
              techStack,
              url,
              image: downloadURL,
            });
          },
          () => {
            saveProject({
              title,
              description,
              techStack,
              url,
              image: null,
            });
          }
        );
      },
      () => {
        saveProject({
          title,
          description,
          techStack,
          url,
          image: null,
        });
      }
    );
  };

  const saveProject = async (project) => {
    try {
      await addDoc(collection(db, "projects"), project);
      window.location.reload(false);
    } catch {
      alert("Failed to upload Project");
    }
  };

  return (
    <div className="dashboard">
      <form ref={Form} onSubmit={submitProject}>
        <p>
          <input type="text" name="title" placeholder="Title" />
        </p>
        <p>
          <textarea type="text" name="description" placeholder="Description" />
        </p>
        <p>
          <input type="text" name="techStack" placeholder="Tech Stack" />
        </p>
        <p>
          <input type="text" name="url" placeholder="URL for project" />
        </p>
        <p>
          <input type="file" name="image" />
        </p>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <button
        className="btn"
        onClick={() => {
          auth.signOut();
          window.location.reload(false);
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
