import React, { useState, useEffect } from "react";
import "../Style/App.css";
import uploadImg from "../Assets/social-media-image-upload-4358258-3618854-removebg-preview.png";

function ML_module() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [classNames, setClassNames] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Fetch class names from the Flask API
    const fetchClassNames = async () => {
      try {
        const response = await fetch("http://localhost:5000/class_names");
        if (response.ok) {
          const classNamesData = await response.json();
          setClassNames(classNamesData);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchClassNames();
  }, []);

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Read and set the image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("files[]", image);

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const resultData = await response.json();
        setResult(resultData);
        setShowContent(true); // Set showContent to true
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="ml-module">
        <div className="upload_section">
          <h3 style={{ color: "purple" }}>Upload Image</h3>
          <img src={uploadImg} className="uploaded_img" alt="Upload Icon" />
          <br />
          <input type="file" onChange={handleFileChange} /> <br />
          <button className="Analyze_btn" onClick={handleUpload}>
            Analyze
          </button>
        </div>

        {result && (
          <div className="result_section">
            <h2>Result:</h2>
            <p>Predicted Class: {result.predicted_class}</p>
            <p>Class Name: {classNames[result.predicted_class]}</p>
            <p>Percentage: {result.percentage * 100} %</p>
            {imagePreview && (
              <img
                src={imagePreview}
                className="uploaded_img_preview"
                alt="Uploaded Preview"
              />
            )}
          </div>
        )}
      </div>
      {showContent && (
        <div className="external-content">
          {classNames[result.predicted_class] === "Diabetes" && (
            <div className="content">
              <h3>
                If you have diabetes, it's important to focus on a balanced and
                nutritious diet to help manage blood sugar levels.
              </h3>
              <ul>
                <li>
                  <b>Leafy Greens:</b> Nutrient-rich and low in carbs, leafy
                  greens like spinach and kale help stabilize blood sugar
                  levels, providing a quick and healthful option for individuals
                  with diabetes.
                </li>

                <li>
                  <b>Fatty Fish (Salmon): </b> Rich in omega-3 fatty acids,
                  salmon supports heart health and reduces inflammation,
                  contributing to improved insulin sensitivity for those with
                  diabetes.
                </li>

                <li>
                  <b>Fatty Fish (Salmon): </b> Packed with healthy fats and
                  fiber, avocados aid blood sugar control and promote satiety,
                  making them an excellent choice for a diabetes-friendly diet.
                </li>

                <li>
                  <b>Avocado:</b> Packed with healthy fats and fiber, avocados
                  aid blood sugar control and promote satiety, making them an
                  excellent choice for a diabetes-friendly diet.
                </li>

                <li>
                  <b>Berries (Blueberries, Strawberries):</b> Low in sugar and
                  high in antioxidants, berries offer a delicious way to satisfy
                  sweet cravings while providing essential nutrients for
                  diabetes management.
                </li>

                <li>
                  <b>Quinoa:</b> A whole grain with a low glycemic index, quinoa
                  provides sustained energy without causing rapid spikes in
                  blood sugar, making it a smart choice for those with diabetes.
                </li>
              </ul>
            </div>
          )}
          {classNames[result.predicted_class] === "Glaucoma" && (
            <>
              <h3>
                Individuals with glaucoma can benefit from a diet rich in
                nutrients that support eye health and reduce intraocular
                pressure.
              </h3>
              <ul>
                <li>
                  <b>Leafy Greens:</b> Spinach and kale, abundant in vitamins
                  and antioxidants, contribute to eye health and may help manage
                  intraocular pressure in glaucoma.
                </li>

                <li>
                  <b>Fish (Salmon):</b> Omega-3 fatty acids in salmon support
                  overall eye function, potentially aiding in the management of
                  glaucoma symptoms.
                </li>

                <li>
                  <b>Nuts and Seeds:</b> Almonds, walnuts, and flaxseeds contain
                  nutrients like vitamin E and omega-3s, which may be beneficial
                  for individuals with glaucoma.
                </li>

                <li>
                  <b>Colorful Fruits (Oranges, Kiwi):</b> Rich in vitamin C,
                  fruits with vibrant colors can contribute to ocular health and
                  may have protective effects against glaucoma.
                </li>

                <li>
                  <b>Carrots:</b> Packed with beta-carotene, carrots support
                  vision and may play a role in maintaining eye health for
                  individuals with glaucoma.
                </li>
              </ul>
            </>
          )}
          {classNames[result.predicted_class] === "Cataract" && (
            <>
              <h3>
                For individuals with cataracts, a diet rich in specific
                nutrients can support eye health and potentially slow the
                progression of cataracts.
              </h3>
              <ul>
                <li>
                  <b>Colorful Vegetables (Bell Peppers, Broccoli):</b> Rich in
                  antioxidants like vitamins C and E, these vegetables may help
                  protect the eyes from oxidative stress associated with
                  cataracts.
                </li>

                <li>
                  <b>Fruits (Berries, Citrus Fruits):</b> High in antioxidants,
                  berries and citrus fruits contribute to overall eye health and
                  may have protective effects against cataracts.
                </li>

                <li>
                  <b>Fish (Salmon):</b> Omega-3 fatty acids in salmon can
                  support eye health and potentially reduce the risk of
                  developing cataracts.
                </li>

                <li>
                  <b>Nuts and Seeds:</b> Almonds, sunflower seeds, and other
                  nuts contain vitamin E, which may play a role in maintaining
                  lens clarity and preventing cataracts.
                </li>

                <li>
                  <b>Leafy Greens:</b> Spinach and kale provide lutein and
                  zeaxanthin, antioxidants that may help protect the eyes from
                  cataract development.
                </li>
              </ul>
            </>
          )}
          {classNames[result.predicted_class] === "Normal" && (
            <>
              <h3>
                Maintaining normal eye health involves a balanced diet rich in
                nutrients that support vision and overall well-being.
              </h3>
              <ul>
                <li>
                  <b>Carrots:</b> High in beta-carotene, carrots contribute to
                  visual health and are known for promoting healthy eyesight.
                </li>

                <li>
                  <b>Leafy Greens:</b> Spinach, kale, and other greens provide
                  essential vitamins and antioxidants that support optimal eye
                  function.
                </li>

                <li>
                  <b>Fish (Tuna):</b> Omega-3 fatty acids in tuna support eye
                  health and may help prevent age-related vision problems.
                </li>

                <li>
                  <b>Citrus Fruits (Oranges, Grapefruits):</b> Vitamin C-rich
                  fruits can protect the eyes from oxidative damage and
                  contribute to overall eye health.
                </li>

                <li>
                  <b>Eggs:</b> Rich in lutein and zeaxanthin, eggs support
                  macular health and can benefit overall vision.
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ML_module;
