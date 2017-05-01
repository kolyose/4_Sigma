export default class BaseLayoutSettings {
  constructor(imageDimensions, rendererDimensions) {
    this._imageDimensions = imageDimensions;
    this._rendererDimensions = rendererDimensions;
  }

  getFragmentDimensionsByFragmentsNumber(fragmentsNumber) {
    const width = this._imageDimensions.width /
      this.getColumnsByFragmentsNumber(fragmentsNumber);
    const height = this._imageDimensions.height /
      this.getRowsByFragmentsNumber(fragmentsNumber);
    return { width, height };
  }

  // eslint-disable-next-line
  get fragmentsPositionRanges() {}

  // eslint-disable-next-line
  get scale() {}
}
