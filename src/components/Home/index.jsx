import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import { CgMergeHorizontal, CgMergeVertical } from "react-icons/cg";
import { IoIosImage } from "react-icons/io";
import "./style.scss";

export default function Home() {
  const [state, setState] = useState({
    image: "",
    brightness: 100,
    grayscale: 0,
    sepia: 0,
    seturation: 100,
    contrast: 100,
    hueRotate: 0,
    rotate: 0,
    vertical: 1,
    horizontal: 1,
  });

  const [crop, setCrop] = useState("");
  const [imageDetails, setImageDetails] = useState("");

  const [selectedProperty, setSelectedProperty] = useState({
    name: "brightness",
    maxValue: 200,
  });

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setState({
          ...state,
          image: reader.result,
          brightness: 100,
          grayscale: 0,
          sepia: 0,
          seturation: 100,
          contrast: 100,
          hueRotate: 0,
          rotate: 0,
          vertical: 1,
          horizontal: 1,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRangeInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const leftRotate = () => {
    setState({
      ...state,
      rotate: state.rotate - 90,
    });
  };

  const rightRotate = () => {
    setState({
      ...state,
      rotate: state.rotate + 90,
    });
  };

  const verticalFlip = () => {
    setState({
      ...state,
      vertical: state.vertical === 1 ? -1 : 1,
    });
  };

  const horizontalFlip = () => {
    setState({
      ...state,
      horizontal: state.horizontal === 1 ? -1 : 1,
    });
  };

  const handleImageCrop = () => {
    const canvas = document.createElement("canvas");
    const scaleX = imageDetails.naturalWidth / imageDetails.width;
    const scaleY = imageDetails.naturalHeight / imageDetails.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      imageDetails,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Url = canvas.toDataURL("image/jpg");
    setState({
      ...state,
      image: base64Url,
    });
  };

  const handleSave = ()=>{
    const canvas = document.createElement("canvas");
     canvas.width = imageDetails.naturalWidth
     canvas.height = imageDetails.naturalHeight
    const ctx = canvas.getContext('2d')

    ctx.filter = `brightness(${state.brightness}%) grayscale(${state.grayscale}%) sepia(${state.sepia}%) saturate(${state.seturation}%) contrast(${state.contrast}%) hue-rotate(${state.hueRotate}deg)`

    ctx.translate(canvas.width/2,canvas.height/2)
    ctx.rotate(state.rotate*Math.PI/180)
    ctx.scale(state.vertical,state.horizontal)

    ctx.drawImage(
        imageDetails,
        -canvas.width/2,
        -canvas.height/2,
        canvas.width,
        canvas.height
    )
    const link = document.createElement('a');
    link.download = `image_edit_${Math.random()}.jpg`;
    link.href = canvas.toDataURL()
    link.click()
  }

  const handleReset = ()=>{
    setState({
      ...state,
      image: "",
      brightness: 100,
      grayscale: 0,
      sepia: 0,
      seturation: 100,
      contrast: 100,
      hueRotate: 0,
      rotate: 0,
      vertical: 1,
      horizontal: 1,
    })
  }

  const filterElement = [
    {
      name: "brightness",
      maxValue: 200,
    },
    {
      name: "grayscale",
      maxValue: 200,
    },

    {
      name: "sepia",
      maxValue: 200,
    },
    {
      name: "seturation",
      maxValue: 200,
    },
    {
      name: "contrast",
      maxValue: 200,
    },
    {
      name: "hueRotate",
      maxValue: 200,
    },
  ];
  return (
    <div className="image_editor">
      <div className="card">
        <div className="card_header">
          <h2>Image Editor</h2>
        </div>
        <div className="card_body">
          <div className="sidebar">
            <div className="side_body">
              <div className="filter_section">
                <span>Filters</span>
                <div className="filter_keys">
                  {filterElement.map((v, i) => (
                    <button
                      className={
                        selectedProperty.name === v.name ? "active" : ""
                      }
                      onClick={() => setSelectedProperty(v)}
                      key={i}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter_slider">
                <div className="label_bar">
                  <label htmlFor="range">{selectedProperty.name}</label>
                  <span>{state[selectedProperty.name]}%</span>
                </div>
                <input
                  onChange={handleRangeInput}
                  name={selectedProperty.name}
                  value={state[selectedProperty.name]}
                  max={selectedProperty.maxValue}
                  type="range"
                  id=""
                />
              </div>

              <div className="rotate">
                <label htmlFor="">Rotate & Flip</label>
                <div className="icons">
                  <div onClick={leftRotate}>
                    <GrRotateLeft />
                  </div>
                  <div onClick={rightRotate}>
                    <GrRotateRight />
                  </div>
                  <div onClick={verticalFlip}>
                    <CgMergeVertical />
                  </div>
                  <div onClick={horizontalFlip}>
                    <CgMergeHorizontal />
                  </div>
                </div>
              </div>
            </div>
            <div className="reset">
              <button onClick={handleReset}>Reset</button>
              <button onClick={handleSave} className="save">Save Image</button>
            </div>
          </div>

          <div className="image_section">
            <div className="image">
              {state.image ? (
                <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                  <img
                    onLoad={(e) => setImageDetails(e.currentTarget)}
                    style={{
                      filter: `brightness(${state.brightness}%) grayscale(${state.grayscale}%) sepia(${state.sepia}%) saturate(${state.seturation}%) contrast(${state.contrast}%) hue-rotate(${state.hueRotate}deg)`,
                      transform: `rotate(${state.rotate}deg) scale(${state.vertical},${state.horizontal})`,
                    }}
                    src={state.image}
                    alt="Image"
                  />
                </ReactCrop>
              ) : (
                <label htmlFor="choose">
                  <IoIosImage />
                  <span>Choose Image</span>
                </label>
              )}
            </div>
            <div className="image_select">
              {crop && (
                <button onClick={handleImageCrop} className="crop">
                  Crop Image
                </button>
              )}
              <label htmlFor="choose">Choose Image</label>
              <input onChange={handleChange} type="file" name="" id="choose" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
