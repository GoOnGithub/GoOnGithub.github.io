<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="sideNav"
        :expand-on-hover="lgAndUp"
        :rail="lgAndUp ? settingsMenu ? false:true :false"
        :temporary="!lgAndUp"
        floating
        class="black"
        theme="dark"
      >
        <v-list>
          <v-list-item
            :prepend-avatar="`src/assets/map/ico.png`"
            title="Go's AAC Map"
          >
          <template v-slot:subtitle>
            <a style="text-decoration: none; color: inherit;"
               href="https:aa-classic.com"
              >aa-classic.com</a>
            </template>
          <template v-slot:append>
            <div class="text-center">
              <v-menu
                v-model="settingsMenu"
                :close-on-content-click="false"
                location="end"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    size="small"
                    variant="text"
                    icon="mdi-cog"
                    v-bind="props"
                  ></v-btn>
                </template>
                <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-icon="mdi-cog"
            title="Settings"
            subtitle="WIP"
          >
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="showKrakenTimer"
              color="blue-darken-3"
              label="Show Kraken"
              hide-details
              @click="toggleServerTimers('Kraken',!showKrakenTimer)"
            ></v-switch>
          </v-list-item>
          <v-list-item>
            <v-switch
              v-model="showDragonTimer"
              color="red-darken-3"
              label="Show Dragon"
              hide-details
              @click="toggleServerTimers('dragon',!showDragonTimer)"
            ></v-switch>
          </v-list-item>
          <v-list-item>
            <v-switch
              v-model="showDGSTimer"
              color="blue-grey darken-3"
              label="Show Ghost Ships"
              hide-details
              @click="toggleServerTimers('dgs',!showDGSTimer)"
            ></v-switch>
          </v-list-item>
          <v-list-item>
            <v-switch
              :v-model="secretButton"
              readonly
              color="black"
              label="Secret ;)"
              hide-details
              @click="revealSecret()"
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="text"
            @click="settingsMenu = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
                </v-menu>
                </div>
            
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list nav>
            
          <v-list-group value="Add">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-plus"
                title="Add Markers"
              ></v-list-item>
            </template>
            <v-dialog
      v-model="newMarkerDialogue"
      width="1024"
    >
      <template v-slot:activator="{ props }">
        <v-list-item
        title="Add New" 
        value="addnewmarker"
        v-bind="props"
        >
        </v-list-item>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Marker</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
              cols="12"
              >
                <v-item-group mandatory selected-class="bg-primary" v-model="markericon">
                  <v-container>
                    <v-row>
                      <v-col
                        v-for="n in customIcons.length"
                        :key="n"
                        cols="12"
                        md="3"
                      >
                        <v-item v-slot="{ isSelected, selectedClass, toggle }">
                          <v-btn :prepend-icon="customIcons[n-1]['svg']" variant="outlined" @click="toggle" height="50" width="100%" :class="['d-flex align-center', selectedClass]">
                            {{ isSelected ? 'Selected' : customIcons[n-1]['name'] }}
                          </v-btn>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-item-group>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="Marker Name*"
                  required
                  counter="1"
                  v-model="markername"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="1"
                justify-center
              >
              <v-switch v-model="expSwitch"> </v-switch>
            </v-col>
            <v-col v-if="expSwitch" cols="12" sm="5">
              <v-row>
              <v-col
                cols="12"
                sm="4"
              >
                <v-text-field
                  label="Hours"
                  type="number"
                  v-model="markerhours"
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
                sm="4"
              >
                <v-text-field
                  label="Minutes"
                  type="number"
                  v-model="markerminutes"
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
                sm="4"
              >
                <v-text-field
                  label="Seconds"
                  type="number"
                  v-model="markerseconds"
                ></v-text-field>
              </v-col>
            </v-row>
            </v-col>
            <v-col cols="12" sm="5" v-else><v-btn size="x-large" disabled block variant="text"> Permanent Marker </v-btn></v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="newMarkerDialogue = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="addNewMarker(e),newMarkerDialogue = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
             <v-list-item title="Load From String" subtitle="WIP" value="loadfromstring"></v-list-item>
          </v-list-group>

          <v-list-item prepend-icon="mdi-delete" title="Delete Markers" subtitle="WIP" value="deletemarker"></v-list-item>
          <v-list-item prepend-icon="mdi-clock-time-four" title="Clock?" subtitle="WIP" value="clock"></v-list-item>
          <v-divider v-if="this.showDragonTimer || this.showKrakenTimer || showDGSTimer"></v-divider>
          <v-list-subheader v-if="this.showDragonTimer || this.showKrakenTimer || showDGSTimer" inset>Server Markers</v-list-subheader>
          <v-list-item v-if="this.showKrakenTimer" density="compact" prepend-icon="mdi-jellyfish-outline" title="Kraken" subtitle="WiP timers" value="Kraken"></v-list-item>
          <v-list-item v-if="this.showDragonTimer" density="compact" prepend-icon="mdi-fire" title="Red Dragon" subtitle="WiP timers" value="dragon"></v-list-item>
          <v-list-item v-if="this.showDGSTimer" density="compact" prepend-icon="mdi-skull-outline" title="DGS" subtitle="WiP timers" value="ghostship"></v-list-item>

          <v-divider></v-divider>
          <v-list-subheader inset>Markers</v-list-subheader>
          <v-list-item
            v-for="i in placedIcons.length"
            :key="i"
            :title="placedIcons[i-1]['name']"
            density="compact"
            :subtitle="placedIcons[i-1]['sidebarTimer']"
            @mouseenter="timerHover([i-1])"
            @mouseleave="timerHoverOff([i-1])"
            >
              <template v-slot:prepend>
                <v-icon :class="placedIcons[i-1]['expr'] ? placedIcons[i-1]['expr'] : ''">{{ placedIcons[i-1]['svg'] }}</v-icon>
              </template>
            <template v-slot:append>
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-delete"
                  variant="text"
                  size="small"
                  @click="deleteMarkerSidebar(i-1)"
                ></v-btn>
              </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh">
      <v-dialog 
        v-model="deleteMarkerDialogue"
        width="auto"
      >

        <v-card class="bg-grey-darken-4">
          <v-card-text>
            Delete marker <span style="color:#E65100">{{ selectedMarkerName }}</span>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="deleteMarkerDialogue = false">Close Dialog</v-btn>
            <v-btn color="primary" @click="deleteMarkerAction(selectedMarker)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
    <v-toolbar theme="dark" class="black d-sm-flex d-md-flex d-lg-none" density="compact">
      <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-snackbar
      v-model="cheekySnackbar"
    >
      {{ cheekyString }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="cheekySnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  <div id="aacmap" style="height:100vh; width:100vw">
  </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer,LControl,LMarker,LIcon} from "@vue-leaflet/vue-leaflet";
import L from 'leaflet';
import moment from "moment";
import "@/assets/map/map.css";
import {Buffer} from 'buffer';
import { useDisplay } from 'vuetify';
export default {
  components: {
    LMap,
    LTileLayer,
    LControl,
    LMarker,
    LIcon,
  },
  data() {
    return {
      map:null,
      zoom: 2,
      maplatlng:[0,0],
      markers:[],
      serverMarkers:[],
      now:moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      sideNav:false,
      newMarkerDialogue: false,
      settingsMenu:false,
      showKrakenTimer:true,
      showDragonTimer:true,
      showDGSTimer:true,
      showPersonalTimers:true,
      secretButton:false,
      cheekySnackbar:false,
      cheekyString:"",
      cheekyArray:["No.","Too Bad","Stop Clicking Me","Wait for it","It's Uber Kraken","Ask Aguru. He loves DMs","https://www.youtube.com/watch?v=-FrpuPLYnvY",],
      markericon:0,
      markername:'',
      markerhours:0,
      markerminutes:0,
      markerseconds:0,
      deleteMarkerDialogue:false,
      selectedMarker:null,
      selectedMarkerName:"",
      expSwitch:false,
      //placedIcons:[{'latlng':{"lat":"40","lon":"12",},'name':'Item 1','expires':0,'timer':0,'sidebarTimer':0,'svg':'mdi-flower'},{'latlng':{"lat":"33","lon":"20",},'name':'Item 2','expires':0,'timer':0,'sidebarTimer':0,'svg':'mdi-tree'}],
      placedIcons:[],
      flower:L.icon({
      iconUrl: 'src/assets/map/map_icons/flower.png',
      iconSize:     [48,48],
      iconAnchor:[24,48],
      }),
      wood:L.icon({
      iconUrl: 'src/assets/map/map_icons/wood.png',
      iconSize:     [48,48],
      iconAnchor:[24,48],
      }),
      pack:L.icon({
      iconUrl: 'src/assets/map/map_icons/pack.png',
      iconSize:     [48,48],
      iconAnchor:[24,48],
      }),
      farm:L.icon({
      iconUrl: 'src/assets/map/map_icons/pack.png',
      iconSize:     [48,48],
      iconAnchor:[24,48],
      }),
      serverIcons:{'Kraken':{'icon':L.icon({ iconUrl: 'src/assets/map/map_icons/krakenc.png', iconSize:[72,72], iconAnchor:[36,36],}),'latlng':[-2.5, -7.6]},'dragon':{'icon':L.icon({ iconUrl: 'src/assets/map/map_icons/dragonc.png', iconSize:[72,72], iconAnchor:[36,36],}),'latlng':[-9, -39.8]},'dgs':{'icon':L.icon({ iconUrl: 'src/assets/map/map_icons/shipc.png', iconSize:[72,72], iconAnchor:[36,36],}),'latlng':[20, 20]}},
      customIcons:[{'name':'plant','icon':'src/assets/map/map_icons/flower.png','svg':'mdi-flower','licon':L.icon({ iconUrl: 'src/assets/map/map_icons/flower.png', iconSize:[48,48], iconAnchor:[24,48], }),},{'name':'wood','icon':'src/assets/map/map_icons/wood.png','svg':'mdi-tree','licon':L.icon({ iconUrl: 'src/assets/map/map_icons/wood.png', iconSize:     [48,48], iconAnchor:[24,48], }),},{'name':'pack','icon':'src/assets/map/map_icons/pack.png','svg':'mdi-package-variant-closed','licon':L.icon({ iconUrl: 'src/assets/map/map_icons/pack.png', iconSize:     [48,48], iconAnchor:[24,48], }),},{'name':'farm','icon':'src/assets/map/map_icons/farm.png','svg':'mdi-tractor','licon':L.icon({ iconUrl: 'src/assets/map/map_icons/pack.png', iconSize:     [48,48], iconAnchor:[24,48], }),}],
    };
  },
  computed:{
  },
  mounted () {
    this.map=L.map('aacmap', {center: [0,0], zoom: 3},onclick="faddMarker()")
    L.TileLayer.include({
      _tileOnError: function () {
        // Prevent the default behavior of logging the error
        return true;
      }
    });
    this.map.on('click', (event) => this.faddMarker(event));
    this.map.zoomControl.setPosition('topright');
    var tileLayer = L.tileLayer('https://aa-classic.com/map/{z}/{x}/{y}.png', {
      minZoom: 3,
      maxZoom: 6,
      noWrap: true,
      errorTileUrl: 'images/empty.png',
      crs: L.CRS.Simple,

    }).addTo(this.map);
    //L.control.scale({position:'bottomleft'}).addTo(this.map);
    this.placedIcons = JSON.parse(localStorage.getItem("placedIcons") || "[]");
    for (var i=0;i<this.placedIcons.length;i++){
      if(this.placedIcons[i]['expires']){
        this.placedIcons[i]['timer'] = moment(this.placedIcons[i]['timer']);
      }
    }
    for(var i=0;i<this.placedIcons.length;i++){
      this.loadIcons(this.placedIcons[i],i)
    }
    if(this.lgAndUp){
      this.sideNav = true
    }
    this.generateServerTimers()
    window.setInterval(() => {
        this.tickTimers()
      }, 1000)
    },
  methods: {
    clickHandler () {
      this.placedIcons.push(this.placedIcons[0])
    },
    faddMarker(e){
      this.maplatlng[0]=Number((e.latlng.lat).toFixed(2))
      this.maplatlng[1]=Number((e.latlng.lng).toFixed(2))
      console.log(this.maplatlng)
      var bin = this.maplatlng[0]
      bin = Math.floor(bin * 256)
      bin = this.toEnc(bin)
      bin = this.fromEnc(bin)
      bin = (bin / 256.0).toFixed(2)
      console.log("decoded "+bin);
      var expires= this.expSwitch ? 1 : 0
      var t=0
      var sbt = 0
      if (this.expSwitch){
        t = moment.utc()
        t.add(this.markerhours, 'hours')
        t.add(this.markerminutes, 'minutes')
        t.add(this.markerseconds, 'seconds')
        sbt = this.sidebarTimer(t)
      }
      if(this.markername!=""){
        // var newMarker = new L.marker(this.maplatlng,{icon:this.customIcons[this.markericon]['licon']},).addTo(this.map);
        var newMarker = new L.marker(this.maplatlng,{icon:this.customIcons[this.markericon]['licon']},);
        newMarker.bindPopup("<b>"+this.markername+"</b>").openPopup();
        //this.map.addLayer(newMarker); 
        newMarker._id=this.markername
        newMarker.addTo(this.map,this.markername)
        this.placedIcons.push({'latlng':e.latlng,'name':this.markername,'expires':expires,'timer':t,'sidebarTimer':sbt,'svg':this.customIcons[this.markericon]['svg'],'icon':this.markericon,'leafletID':newMarker['_leaflet_id']})
        this.markers.push(newMarker);
        this.markername=""
      }
      //var newMarker = new L.marker(this.maplatlng,{icon:this.flower}).addTo(this.map);
      
      this.now=moment.utc(),
      localStorage.setItem("placedIcons", JSON.stringify(this.placedIcons));
    },
    loadIcons(e,i){
      console.log(e)
      var newMarker = new L.marker(e['latlng'],{icon:this.customIcons[e['icon']]['licon']});
      newMarker._id=e['name']
      newMarker.bindPopup("<b>"+e['name']+"</b>").openPopup();
      newMarker.addTo(this.map)
      this.placedIcons[i]['leafletID']=newMarker['_leaflet_id']
      this.markers.push(newMarker);
    },
    addNewMarker(e){
      console.log(this.markername)
      console.log(this.markericon);
    },
    deleteMarkerSidebar(i){
      console.log(i)
      this.deleteMarkerDialogue=true;
      this.selectedMarker=i
      this.selectedMarkerName=this.placedIcons[i]['name']
      console.log(this.placedIcons[i])
    },
    deleteMarkerAction(e){
      for (var i=0;i<this.markers.length;i++){
        if(this.markers[i]['_leaflet_id'] === this.placedIcons[e]['leafletID']){
          console.log("marker leaflet id "+this.markers[i]['_leaflet_id']);
          console.log("placed icons index id "+this.placedIcons[e]['leafletID'])
          if(this.map.hasLayer(this.markers[i])){
            console.log("deleting "+this.markers[i]['_leaflet_id']);
            this.map.removeLayer(this.markers[i])
            this.deleteMarkerDialogue=false;
            this.placedIcons.splice(e, 1);
            console.log(e)
            console.log(this.placedIcons)
            localStorage.setItem("placedIcons", JSON.stringify(this.placedIcons));
            return
          }
        }
      }
      this.deleteMarkerDialogue=false;
    },
    timerHover(e){
      for (var i=0;i<this.markers.length;i++){
        if(this.markers[i]['_leaflet_id'] === this.placedIcons[e]['leafletID']){
          if(this.map.hasLayer(this.markers[i])){
            this.markers[i].openPopup()
            return
          }
        }
      }
    },
    timerHoverOff(e){
      for (var i=0;i<this.markers.length;i++){
        if(this.markers[i]['_leaflet_id'] === this.placedIcons[e]['leafletID']){
          if(this.map.hasLayer(this.markers[i])){
            this.markers[i].closePopup()
            return
          }
        }
      }
    },
    sidebarTimer(e){
      var duration = moment.duration(e.diff(this.now));
      return parseInt(duration.asHours())+":"+parseInt(duration.asMinutes()) % 60+":"+parseInt(duration.asSeconds()) % 60
    },
    tickTimers(e){
      this.now=moment.utc()
      for (var i=0;i<this.placedIcons.length;i++){
        if (this.placedIcons[i]['expires']){
          var duration = moment.duration(this.placedIcons[i]['timer'].diff(this.now));
          if (duration > 0){
            this.placedIcons[i]['sidebarTimer'] = parseInt(duration.asHours())+":"+parseInt(duration.asMinutes()) % 60+":"+parseInt(duration.asSeconds()) % 60
            if (duration <= 900000){
              this.placedIcons[i]['expr']='icon_expiring'
            }
          }else{
            this.placedIcons[i]['sidebarTimer'] = "Expired: "+this.placedIcons[i]['timer'].format("dd hh:mm:ss")
            this.placedIcons[i]['expires'] = 0
            this.placedIcons[i]['expr'] = 'icon_expired'
          }
        }
      }
    }, 
    generateServerTimers(){
      var names=['Kraken','dragon','dgs']
      for (var i=0;i<names.length;i++){
        console.log(this.serverIcons[names[i]])
        this.generateServerTimersIND(names[i])
      }
      console.log(this.serverIcons);
    },
    generateServerTimersIND(x){
      var newMarker = new L.marker(this.serverIcons[x]['latlng'],{icon:this.serverIcons[x]['icon']},);
      newMarker.bindPopup("<b>"+x+"</b>").openPopup();
      newMarker.addTo(this.map)
      this.serverMarkers.push(newMarker)
      this.serverIcons[x]['index']=this.serverMarkers.length-1
    },
    deleteServerTimersInd(x){
      console.log(this.serverIcons[x]['index']);
      console.log(console.log(this.serverMarkers[this.serverIcons[x]['index']]));
      this.map.removeLayer(this.serverMarkers[this.serverIcons[x]['index']])
      console.log(x);
    },
    toggleServerTimers(x,y){
      if(y){
        this.generateServerTimersIND(x)
      }else{
        this.deleteServerTimersInd(x)
      }
      console.log(x);
      console.log(y);
    },
    toEnc(x) {
      if (x<0){
        x = Math.abs(x)
        x=this.enc(x)
        x="!"+x
        return x;
      }else{
        return x=this.enc(x)
      }
      },
      fromEnc(x){
        if(x.charAt(0)=="!"){
          x = x.slice(1)
          x=this.dec(x)
          x = -Math.abs(x)
          return x
        }else{
          return this.dec(x)
        }
      },
      binaryAgent(str) {

        var binString = '';

        str.split(' ').map(function(bin) {
            binString += String.fromCharCode(parseInt(bin, 2));
          });
        return binString;
        },
        enc(num){
          num = String(num);
          var encodedChunks = [];
          while(num.length){
              var splitPosition = 7;
              var encodedNum = '';
              do {
                  encodedNum = Number('1' + num.substr(0, ++splitPosition)).toString(36);
              } while(encodedNum.length < 8 && splitPosition < num.length && splitPosition < 15);
              encodedChunks.push(encodedNum);
              num = num.substr(splitPosition);
          }
          return encodedChunks.join('');
      },
      dec(input){
          return input.match(/.{8}|.+/g).map(function(chunk){
              return String(parseInt(chunk, 36)).substr(1);
          }).join('');
      },
      revealSecret(){
        this.secretButton=false
        this.cheekySnackbar=true
        this.cheekyString= this.cheekyArray[Math.floor(Math.random()*this.cheekyArray.length)];
      }
  },
    setup () {
      // Destructure only the keys we want to use
      const { xs, lgAndUp } = useDisplay()

      return { xs, lgAndUp }
    },
};
</script>

<style></style>