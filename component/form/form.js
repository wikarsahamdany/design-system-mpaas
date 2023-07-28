Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleInput(e) {
      const name = e.detail.value;
      this.setData({
        name: name
      });
    },
    handleSubmit() {
      const name = this.data.name;
      if (name) {
        my.showToast({
          content: `Hello, ${name}! Form submitted successfully.`,
        });
      } else {
        my.showToast({
          content: 'Please enter your name.',
          type: 'fail',
        });
      }
    },
  },
});
