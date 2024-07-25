import React from "react";

const EventImage = ({ image }: any) => {
  const imageUrl = `data:image/jpg;base64,${image}`; // Adjust the MIME type (image/png) if necessary

  return (
    <img
      src={imageUrl}
      alt="Event"
      style={{
        height: "35vh",
        objectFit: "cover",
      }}
    />
  );
};

export default EventImage;
