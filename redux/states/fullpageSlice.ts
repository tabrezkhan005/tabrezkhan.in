import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first: { suscribe: 0, direction: "" },
  second: { suscribe: 0, direction: "" },
  third: { suscribe: 0, direction: "" },
  fourth: { suscribe: 0, direction: "" },
  fifth: { suscribe: 0, direction: "" },
  sixth: { suscribe: 0, direction: "" },
  seventh: { suscribe: 0, direction: "" },
  eighth: { suscribe: 0, direction: "" },
  ninth: { suscribe: 0, direction: "" },
  tenth: { suscribe: 0, direction: "" },
};

const FullpageSlice = createSlice({
  name: "fullpage",
  initialState,
  reducers: {
    setActiveSlide: (
      state,
      {
        payload,
      }: { payload: [anchor: keyof typeof initialState, direction: string] }
    ) => {
      const [anchor, direction] = payload;
      const current = state[anchor] || { suscribe: 0, direction: "" };

      return {
        ...state,
        [anchor]: { suscribe: current.suscribe + 1, direction },
      };
    },
  },
});

export const { setActiveSlide } = FullpageSlice.actions;

export default FullpageSlice.reducer;
