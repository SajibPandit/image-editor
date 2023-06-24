import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import { CgMergeHorizontal, CgMergeVertical } from "react-icons/cg";
import { IoMdUndo, IoMdRedo, IoIosAdd, IoIosImage } from "react-icons/io";
import "./style.scss";

export default function Home() {
  const filterElement = [
    {
      name: "brightness",
    },
    {
      name: "grayscale",
    },

    {
      name: "sepia",
    },
    {
      name: "seturation",
    },
    {
      name: "contrast",
    },
    {
      name: "hueRotate",
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
                    <button key={i}>{v.name}</button>
                  ))}
                </div>
              </div>
              <div className="filter_slider">
                <div className="label_bar">
                  <label htmlFor="range">Rotate</label>
                  <span>100%</span>
                </div>
                <input type="range" name="" id="" />
              </div>

              <div className="rotate">
                <label htmlFor="">Rotate & Flip</label>
                <div className="icons">
                  <div>
                    <GrRotateLeft />
                  </div>
                  <div>
                    <GrRotateRight />
                  </div>
                  <div>
                    <CgMergeVertical />
                  </div>
                  <div>
                    <CgMergeHorizontal />
                  </div>
                </div>
              </div>
              
            </div>
            <div className="reset">
                <button>Reset</button>
                <button className="save">Save Image</button>
              </div>
          </div>

          <div className="image_section">
            <div className="image">
                <label htmlFor="choose">
                    <IoIosImage/>
                    <span>Choose Image</span>
                </label>
            </div>
            <div className="image_select">
              <button className="undo">
                <IoMdUndo />
              </button>
              <button className="redo">
                <IoMdRedo />
              </button>
              <button className="crop">Crop Image</button>
              <label htmlFor="choose">Choose Image</label>
              <input type="file" name="" id="choose" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
