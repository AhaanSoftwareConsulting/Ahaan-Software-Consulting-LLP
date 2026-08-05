import React from "react";

class EditorErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="text-danger fw-bold">
          ⚠️ Editor crashed. Please reload or try again later.
        </p>
      );
    }

    return this.props.children;
  }
}

export default EditorErrorBoundary;
