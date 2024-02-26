export function formatSize({ bytes, decimals }) {
    if (bytes === 0) {
        return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export async function downloadFile({ dataUrl, fileName }) {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const href = window.URL.createObjectURL(blob); // Create a URL object from the blob which can be used to download the image
    // Trigger download
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', fileName); // Set the file name for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href); // Clean up the URL object to free memory
}