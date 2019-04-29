import React from 'react';
import { css } from '@emotion/core';
// First way to import
import {
  BarLoader, BeatLoader, BounceLoader, CircleLoader, ClipLoader,
  ClimbingBoxLoader, MoonLoader, PacmanLoader, PulseLoader, RingLoader,
  RotateLoader, SyncLoader
} from 'react-spinners';
// Another way to import
// import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class LoadingSpinnerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.randomlyPickLoader = this.randomlyPickLoader.bind(this);
  }

  randomlyPickLoader(multiplier) {
    const loaders = [BarLoader, BeatLoader, BounceLoader, CircleLoader, ClipLoader,
    ClimbingBoxLoader, MoonLoader, PacmanLoader, PulseLoader, RingLoader,
    RotateLoader, SyncLoader];
    const allProps = [{'height': 4, 'width': 100}, {'size': 15}, {'size': 60}, {'size': 50}, {'size': 35},
    {'size': 15}, {'size': 60}, {'size': 25}, {'size': 15}, {'size': 60},
    {'size': 15}, {'size': 15}];
    const index = Math.floor(Math.random() * loaders.length);
    const Component = loaders[index]
    const props = allProps[index]
    if (props.size !== undefined) {
      return (
        <Component
          css={override}
          sizeUnit={"px"}
          color={'#123abc'}
          loading={this.props.isLoading}
          size={props['size'] * multiplier}
        />
      );
    } else {
      return (
        <Component
          css={override}
          sizeUnit={"px"}
          color={'#123abc'}
          loading={this.props.isLoading}
          height={props['height'] * multiplier}
          width={props['width'] * multiplier}
        />
      );
    }

  }

  render() {
    if (!this.props.isLoading) return (<div/>);
    return (
      <div className='sweet-loading' style={{"justify-content": "center", "align-items": "center", ...this.props.style}}>
        {this.randomlyPickLoader(this.props.multiplier)}
      </div>
    )
  }
}

export default LoadingSpinnerComponent;
