import * as React from "react";
import { Reorder } from "framer-motion"
import { getPromotions, useGlobalData } from "./contexts/AppContext";
import { useEffect, useState } from "react";
import AllPromtion from "./components/AllPromotion.component";
import NewCustomer from "./components/NewCustomer.component";

function App() {

  const [state, { updatePromotions }] = useGlobalData()

  const [onlyNewCustomers, setOnlyNewCustomers] = useState(false)

  const data = state?.promotions || []

  useEffect(() => {
    if (!data || data.length == 0) {
      getPromotions().then((promotions) => {

        let filterPromotions = [];

        if (onlyNewCustomers) {
          filterPromotions = promotions.filter((promotion) => promotion?.onlyNewCustomers == true).sort((a, b) => a?.sequence - b?.sequence < 0 ? 1 : -1)
        } else {
          filterPromotions = [].concat(promotions)
        }

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

  const handleType = (type) => {

    setOnlyNewCustomers(type)
  }

  return (
    <div
      className="flex flex-column items-center h-full"
    >
      {/* <div className="height-100 flex items-center justify-center">
        <div className="tab-left text-yellow">All promotions</div>
        <div className="tab-right text-white">New Customers</div>
      </div> */}
      <div className="height-100 flex items-center justify-center">
        <button class={onlyNewCustomers ? "glow-on-hover-left" : "glow-on-hover-left category-button"} type="button" onClick={(e) => handleType(false)}>All Promotions</button>
        <button class={onlyNewCustomers ? "glow-on-hover-right category-button" : "glow-on-hover-right"} type="button" onClick={(e) => handleType(true)} style={onlyNewCustomers ? { borderLeft: '2px' } : { borderLeftWidth: '0px' }}>New Customers</button>
      </div>
      {onlyNewCustomers ? (
        <div className="flex flex-column overflow-y w-full h-full p-20">
          {
            data.map((item) => (
              <NewCustomer promotion={item} />
            ))
          }
        </div>
      ) : (
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
                <AllPromtion promotion={item} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}

    </div >
  );
}

export default App;
