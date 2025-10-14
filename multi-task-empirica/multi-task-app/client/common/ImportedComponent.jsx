import React from "react";
import Loading from "./components/Loading";

const ErrMessage = () => <div>Failed to load game!</div>;

export default class ImportedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { myComp: Loading };

    this.loadComponent();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidUpdate(prevProps) {
    if (
      !this.unmounted &&
      prevProps.componentPath !== this.props.componentPath
    ) {
      this.loadComponent();
    }
  }

  loadComponent() {
    const componentPath = this.props.componentPath;
    this.currentComponentPath = componentPath;

    import(componentPath)
      .then(
        ((compPath) => (MyComp) => {
          // Stop if Task Component already unloaded or if componentPath is not
          // the currently expected component (fast out of order loading).
          if (this.unmounted || this.currentComponentPath !== compPath) {
            return;
          }

          this.setState({ myComp: MyComp.default });
        })(componentPath)
      )
      .catch((err) => {
        console.error("Failed to load component:");
        console.error(err);

        if (!this.unmounted) {
          this.setState({ myComp: ErrMessage });
        }
      });
  }

  render() {
    const MyComp = this.state.myComp;

    return <MyComp {...this.props} />;
  }
}
