import React from "react";

function RightPanel() {
  const data = [
    {
      id: 1,
      title: "Card 1",
      image: "https://picsum.photos/id/237/200/300",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit turpis eu mauris posuere, quis commodo ipsum porttitor. Donec rhoncus ante ac elit hendrerit aliquam. Nulla facilisi.",
    },
    {
      id: 2,
      title: "Card 2",
      image: "https://picsum.photos/id/238/200/300",
      content:
        "Vivamus convallis eros sit amet tristique euismod. Nulla facilisi. In vel urna at nunc lobortis pulvinar vel id nibh. Praesent volutpat consequat felis, in commodo enim mattis sed.",
    },
    {
      id: 3,
      title: "Card 3",
      image: "https://picsum.photos/id/239/200/300",
      content:
        "Pellentesque eget odio elit. Etiam a elit enim. Aenean ut mollis velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed ut justo nec lectus vehicula aliquet.",
    },
  ];

  return (
    <div className="right-panel">
      {data.map((item) => (
        <div className="card" key={item.id}>
          <div className="image-container">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="content-container">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RightPanel;
