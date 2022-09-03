const createTrack = async () => {

    let tracks = []

    let image = ""
    let trackUrl = ""

    try {
        const imageRef = ref(storage, `song/${id}/image`)
        const trackRef = ref(storage, `track/${id}/song`);

        if (selectedSong) {
            await uploadString(trackRef, selectedSong, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(trackRef);
                trackUrl = downloadURL
            });
        }

        if (selectedMusicImage) {
            await uploadString(imageRef, selectedMusicImage, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef)
                image = downloadURL
            })
        }

        if(selectedSong && selectedMusicImage){
            await axios({
               url: "songs",
               method: "POST",
               data: {
                   title,
                   artist,
                   image,
                   track: trackUrl,
                   user: session?.email,
               },
               headers: {
                   Authorization : `Bearer ${token}`
                 }
           })
           .then((res) => {
               console.log(res?.data)
               tracks.push({
                   title,
                   artist,
                   image,
                   track: trackUrl,
                   user: session?.email,
               })
               setAddedTracks(addedTracks.concat(tracks).reverse())
           })
        }


        setIsOpen(false)
        setSelectedMusicImage(null)
        setSelectedSong(null)
        
    } catch (error) {
        console.log(error)
        
    }
    
}