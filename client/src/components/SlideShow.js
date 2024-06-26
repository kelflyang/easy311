import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function SlideShow({ items }) {
  return (
      <>
    {items &&  (<div id={"image-carousel"}>
      {items.length > 1 ? (
        <Carousel prevLabel={""} nextLabel={""} >
          {items.map((item) => {
            return (
              <Carousel.Item>
                 <img className={"slider-img"}
      src={`${item[0]}`}
    />
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <img className={"slider-img"}
      src={`${items[0][0].toString('base64')}`}
    />
      )}
    </div>)}</>
  );
}
