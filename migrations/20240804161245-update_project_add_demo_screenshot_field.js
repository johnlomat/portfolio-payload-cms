module.exports = {
  async up(db, client) {
    // Update existing documents to add the new fields with default values
    await db.collection('projects').updateMany(
      { demo_link: { $exists: false }, screenshot_link: { $exists: false } }, // Match documents that don't have the new fields
      {
        $set: {
          demo_link: '', // Set the new field with a default value
          screenshot_link: '', // Set the new field with a default value
        },
      },
    )

    console.log(
      'Migration up: Added demo_link and screenshot_link fields to existing documents in the projects collection',
    )
  },

  async down(db, client) {
    // Remove the new fields from existing documents
    await db.collection('projects').updateMany(
      {},
      {
        $unset: {
          demo_link: '', // Remove the demo_link field
          screenshot_link: '', // Remove the screenshot_link field
        },
      },
    )

    console.log(
      'Migration down: Removed demo_link and screenshot_link fields from existing documents in the projects collection',
    )
  },
}
