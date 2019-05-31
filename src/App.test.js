import React from "react";
import { shallow, configure } from "enzyme";
import App from "./App";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// jest.mock("axios", () => {
//   return {
//     get: jest.fn(() =>
//       Promise.resolve({
//         data: [
//           {
//             id: 4616,
//             name: "Blue Point Brewing Co",
//             brewery_type: "large",
//             street: "161 River Ave",
//             city: "Patchogue",
//             state: "New York",
//             postal_code: "11772-3304",
//             country: "United States",
//             longitude: "-73.0216062980388",
//             latitude: "40.75913445",
//             phone: "6314756944",
//             website_url: "http://www.bluepointbrewing.com",
//             updated_at: "2018-08-24T15:38:13.401Z",
//             tag_list: []
//           },
//           {
//             id: 4647,
//             name: "Brown's Brewing Co",
//             brewery_type: "brewpub",
//             street: "50 Factory Hill Rd",
//             city: "North Hoosick",
//             state: "New York",
//             postal_code: "12133",
//             country: "United States",
//             longitude: "-73.3451582057618",
//             latitude: "42.9266144376744",
//             phone: "5182732337",
//             website_url: "http://www.brownsbrewing.com",
//             updated_at: "2018-08-24T15:38:21.495Z",
//             tag_list: []
//           }
//         ]
//       })
//     )
//   };
// });

// const axios = require("axios");



// it("retrives beer data", () => {
//   const getSpy = jest.spyOn(axios, 'get')
//   const wrapper = shallow(
//     <App />
//   )
//   expect(getSpy).toBeCalled()
// });
