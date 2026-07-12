import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Application error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen px-6 py-24 text-center">
          <h1 className="title text-4xl font-semibold text-gray-900">
            Something went wrong
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Please refresh the page or try again shortly.
          </p>
        </main>
      );
    }

    return this.props.children;
  }
}
