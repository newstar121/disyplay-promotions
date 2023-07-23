import * as React from "react";
import { Reorder } from "framer-motion"
import { getPromotions, useGlobalData } from "./contexts/AppContext";
import { useEffect, useState } from "react";

function App() {

  const [state, { updatePromotions }] = useGlobalData()

  const [onlyNewCustomers, setOnlyNewCustomers] = useState(false)

  const data = state?.promotions || []

  useEffect(() => {
    if (!data || data.length == 0) {
      getPromotions().then((promotions) => {
        let filterPromotions = promotions.filter((promotion) => promotion?.onlyNewCustomers == onlyNewCustomers).sort((a, b) => a?.sequence - b?.sequence < 0 ? 1 : -1)
        updatePromotions(filterPromotions)
        // let result = []
        // for(let i = 0; i < 2; i ++) {
        //   for(let j = 0; j < promotions.length; j ++) {
        //     promotions[j].id = i * promotions.length + j
        //     result.push(promotions[j])
        //   }
        // }
        // updatePromotions(result)
      })
    }
  }, [onlyNewCustomers])

  // const [scrollStartY, setScrollStartY] = useState(null);
  // const [scrollStartTime, setScrollStartTime] = useState(null);

  // const handleTouchStart = (e) => {
  //   setScrollStartY(e.touches[0].clientY);
  //   setScrollStartTime(Date.now());
  // }

  // const handleTouchMove = (e) => {
  //   const scrollY = e.touches[0].clientY;
  //   const scrollDelta = scrollStartY - scrollY;
  //   const scrollTime = Date.now() - scrollStartTime;

  //   if(Math.abs(scrollDelta / scrollTime) > 100) {
  //     console.log('Scroll speed:', Math.abs(scrollDelta / scrollTime));
  //     e.stopPropagation()
  //   }
  //   if (scrollDelta > 10 && scrollTime < 1000) {
  //     // User is scrolling up
  //     const scrollSpeed = scrollDelta / scrollTime;
  //     console.log('Scroll speed:', scrollSpeed);
  //     window.scrollTo(0, window.pageYOffset - 10);
  //   } else if (scrollDelta < -10 && scrollTime < 1000) {
  //     // User is scrolling down
  //     const scrollSpeed = -scrollDelta / scrollTime;
  //     console.log('Scroll speed:', scrollSpeed);
  //     window.scrollTo(0, window.pageYOffset + 10);
  //   }
  // }

  // const handleTouchEnd = () => {
  //   setScrollStartY(null);
  //   setScrollStartTime(null);
  // }

  return (
    <div
      className="flex flex-column items-center h-full"
    >
      <div className="h-100 flex items-center justify-center">
        <div className="tab-left text-yellow">All promotions</div>
        <div className="tab-right text-white">New Customers</div>
      </div>
      <div
        className="flex justify-center overflow-y w-full flex-1 mb-40"
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
      >
        <Reorder.Group values={data} onReorder={updatePromotions}>
          {data.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              className="flex justify-center"
            >
              {item.name}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}

export default App;
