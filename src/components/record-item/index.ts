Component({
  properties: {
    item: {
      type: Object,
      value: {}
    },
    customClass: {
      type: String,
      value: ''
    }
  },
  methods: {
    onEditRecord(evt) {
      wx.navigateTo({
        url: `/pages/editRecord/index?recordId=${evt.target.id}&navigateBack=true`,
      })
    },
    remove(evt) {
      this.triggerEvent('remove', {
        id: evt.target.id,
        record: evt.target.dataset.record
      })
    }
  }
})