const emitterResolvers = {
    searching(val){
        this.isLoaded = false
        const foundFiles = this.files.filter(f=>f.originalName.toLowerCase().search(val.trim())!==-1)
        this.detectChanges([],this.isLoaded)
        setTimeout(_=>{
            this.isLoaded = true
            this.detectChanges(foundFiles, this.isLoaded)
        },500)
    },
    myFilter(toShow){
        console.log(toShow)
        if(toShow==='all') return this.detectChanges(this.files,true)
        const filteredItems =  this.files.filter(f=>!f.observe)
        this.detectChanges(filteredItems,true)
    }
}

export {
    emitterResolvers
}
