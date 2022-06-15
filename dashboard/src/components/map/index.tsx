import React, { useEffect } from 'react';
import { Mappable } from '../../interfaces';
import { CreateMap } from '../../utils/CreateMap';

interface Props {
  mappable: Mappable;
}

const Map = (props: Props): JSX.Element => {
  useEffect(() => {
    const map = new CreateMap('map');
    map.addMarker(props.mappable);
  }, []);

  return <div id="map" style={{ height: 300, width: '100%' }} />;
};

export default Map;
