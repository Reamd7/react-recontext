import * as React from "react";

export default (Consumer: React.Consumer<any>) => (
  mapStateToProps: (state: object) => object
) => (ComponentToWrap: React.ComponentType) => {
  const ConnectedComponent = (props: any) => (
    <Consumer>
      {(state: any) => {
        const stateToProps = mapStateToProps(state || {});
        return <ComponentToWrap {...props} {...stateToProps} />;
      }}
    </Consumer>
  );

  const displayName = ComponentToWrap.displayName || "NoName";
  ConnectedComponent.displayName = `Consumer(${displayName})`;

  return ConnectedComponent;
};
