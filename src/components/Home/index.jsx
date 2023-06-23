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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
