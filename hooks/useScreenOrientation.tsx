import * as ScreenOrientation from "expo-screen-orientation";
import { type OrientationChangeEvent } from "expo-screen-orientation";
import { useEffect, useState } from 'react';


const useScreenOrientation = () => {
    const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>();

    useEffect(() => {
      const getOrientation = async () => {
        const current = await ScreenOrientation.getOrientationAsync();
  
        setOrientation(current);
      };

      getOrientation();
  
      const orientationChangeSub =
        ScreenOrientation.addOrientationChangeListener(orientationChanged);
  
      return () => {
        ScreenOrientation.removeOrientationChangeListener(orientationChangeSub);
      };
    }, []);

    const orientationChanged = (event: OrientationChangeEvent) => {
        setOrientation(event.orientationInfo.orientation);
      };

    return {
        orientation,
      };
}

export default useScreenOrientation