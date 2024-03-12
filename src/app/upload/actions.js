'use server'


// This is the action that will be called when the form is submitted
// get the image from the form data and send it back to the frontend to be displayed


export async function createThumbnail(prevState, formData) {

    // Get the image from the form data
    const image = formData.get('image')
    const text = formData.get('text')
    console.log('yeehaw image', formData.get('image'));
    console.log('yeehaw text', formData.get('text'));
    
    // const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    // })
    // const data = await response.json()
    // return { ...prevState, message: data.message }
}


async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // The response will contain the processed image URL and the text
      // console.log(data.imageUrl, data.text);
      console.log('success!', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };