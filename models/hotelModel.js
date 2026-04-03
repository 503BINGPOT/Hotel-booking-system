class Hotel{
    constructor(){
        this.floors = [];
        this.setupHotel();
    }

    setupHotel(){
        for(let floor = 1; floor<=9;floor++){
            this.floors.push(new Array(10).fill(0));
        }
        this.floors.push(new Array(7).fill(0));
    }

    getRooms(){
        return this.floors;
    }

    getPosition(roomNumber){
        let floor,index;   
        if(roomNumber>= 1000){
            floor = 10;
            index = roomNumber - 1001;
        }else{
            floor = Math.floor(roomNumber/100);
            index = roomNumber%100 - 1;
        }
        return {floor,index};
    }

    getRoomNumber(floor,index){
        if(floor === 10) return 1000 + (index+1);
        return floor*100 + (index+1);
    }

    getTravelTime(roomA,roomB){
        const a = this.getPosition(roomA);
        const b = this.getPosition(roomB);

        const vertical = Math.abs(a.floor - b.floor) *2;
        const horizontal = Math.abs(a.index - b.index) * 1;

        return horizontal+vertical;
    }

    getAvailableRooms(){
        const available = [];
        for(let f = 0; f<this.floors.length;f++){
            for(let i = 0; i<this.floors[f].length;i++){
                if(this.floors[f][i] === 0){
                    available.push(this.getRoomNumber(f+1,i));
                }
            }
        }
        return available;
    }
    
    occupy(rooms) {
    for (let r of rooms) {
      let pos = this.getPosition(r);
      this.floors[pos.floor - 1][pos.index] = 1;
    }
  }

  bookRooms(count) {
    if(count > 5){
            return { success: false, message: "Cannot book more than 5 rooms at once" };
        }
    if (count <= 0) {
      return { success: false, message: "Invalid count" };
    }

    let available = this.getAvailableRooms();

    if (available.length < count) {
      return { success: false, message: "Not enough rooms" };
    }

    available.sort((a, b) => {
      let A = this.getPosition(a);
      let B = this.getPosition(b);

      if (A.floor !== B.floor) return A.floor - B.floor;
      return A.index - B.index;
    });

    let bestSet = [];
    let bestTime = Infinity;

    for (let i = 0; i <= available.length - count; i++) {
      let group = available.slice(i, i + count);

      let first = group[0];
      let last = group[group.length - 1];

      let time = this.getTravelTime(first, last);
      if (time < bestTime) {
        bestTime = time;
        bestSet = group;
      }
    }
    this.occupy(bestSet);

    return {
      success: true,
      rooms: bestSet,
      travelTime: bestTime
    };
  }
    randomOccupancy(){
        for(let f = 0;f<this.floors.length;f++){
            for(let i = 0;i<this.floors[f].length;i++){
                this.floors[f][i] = Math.random() > 0.5 ? 1 : 0;
            }
        }
    }

    resetRooms(){
        for(let f = 0; f < this.floors.length; f++){
            for(let i = 0; i < this.floors[f].length; i++){
                this.floors[f][i] = 0;
            }
        }
    }
}

module.exports = new Hotel();