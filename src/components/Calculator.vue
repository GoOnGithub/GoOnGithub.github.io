<template>
  <v-container id="skill-calc" class="fill-height" fluid style="background-color: #171e29;padding:0;">
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height" >
        <v-row style="max-width:1000px;margin:auto">
          <v-container style="background-color: #1f2b3b;color:#fff; border: 1px solid #31435d; border-radius: 8px;">
            <v-row no-gutters>
              <v-col cols="8" md="3" order-md="3">
                <v-card-actions class="justify-center px-6">
                  <v-form
                    v-model='loadForm'
                    style="width:100%;"
                    @submit.prevent="loadBuildPrompt()"
                  >
                    <v-text-field v-model="buildStr" hide-details="auto" variant="underlined" label="Load Build">
                      <template v-slot:append-inner>
                        <v-fade-transition leave-absolute>
                            <v-icon icon="mdi-arrow-right "></v-icon>
                        </v-fade-transition>
                      </template>
                    </v-text-field>
                    </v-form>
                </v-card-actions>
              </v-col>
              <v-col cols="4" md="2" order-md="4">
                <v-card-actions class="justify-center px-6">
                  <v-btn @click="saveBuild();bsaveModal = true" icon="mdi-content-save" size="large" style="background-color:#0da9ef;color:#fff"></v-btn>
                  <v-snackbar vertical v-model="bsaveModal"> Build link generated:<span style="color: #e28552;font-weight: 500;font-size: 0.875rem;letter-spacing: 0.09em;padding:8px;justify-content: left;">{{ buildString }}</span>
                    <template v-slot:actions>
                            <v-btn
                              color="#e28552"
                              variant="text"
                              timeout="8000"
                              prepend="a"
                              @click="bsaveModal = false;copyBuild()"
                            >
                              Copy & Close
                            </v-btn>
                    </template>
                  </v-snackbar>
                </v-card-actions>
              </v-col>
              <v-col cols="12" md="5" order-md="1">
                <v-card-actions class="justify-center px-6">
                  <v-card-text style="color:#fff;font-size: 22px;margin-bottom: -28px;">{{className}}</v-card-text>
                </v-card-actions>
              </v-col>
              <v-col cols="12" md="2" order-md="2">
                <v-card-actions class="justify-center px-6">
                  <div style="font-size: 22px; margin-bottom: -28px;">{{ current_points }} / {{ total_points }}</div>
                  <!-- <v-card-text style="color:#fff;">{{ current_points }} / {{ total_points }}</v-card-text> -->
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        <v-col
          :key="index"
          cols="12"
          md="4"
          xs="12"
          v-for="index in 3"
        >
        <v-card :min-height="mdAndUp ? 450 : 100" style="background: transparent; align-items: center; justify-content: center; display: flex;" class="elevation-0" v-if="Object.keys(t[index - 1]).length == 0" ><v-btn  icon="mdi-plus" size="x-large" @click="overlay = !overlay;a=(index - 1)" style="background-color: #1f2b3b;color:#fff;"></v-btn></v-card>
        <v-card class="skill-tree" v-else style="background-color: #1f2b3b;color:#fff; border: 1px solid #31435d; border-radius: 8px;max-width:300px;margin:auto;">
          <v-card-title>{{t[index - 1].name}} <v-chip>{{ t[index - 1].points }} / 19</v-chip></v-card-title>
          <v-container style="max-width: 250px;">
              <v-row dense>
                <v-col
                  v-for="n in 12"
                  :key="n"
                  cols="3"
                  class="active-skills pa-2"
                >
                <v-btn :ref="'t' + [index-1] + 'a'" @mouseover="skillHover = true;skillInfo = (t[index - 1]['desc'][n-1])" @mouseleave="skillHover = false" @mousemove="moxy($event)" @click="selectSkill((index - 1),n-1,'a') ? setActive((index - 1),n-1,'a') : setInactive((index - 1),n-1,'a')" color="#171e29" min-width="45" height="45" width="45" density="compact" rounded="rounded-0">
                  <v-img
                  :width="45"
                  aspect-ratio="1.1"
                  :src="`src/assets/skillcalc/skills_icons/${this.t[(index - 1)]['desc'][n-1]['skillid']}.gif`" />
                </v-btn>
              </v-col>
              <v-divider></v-divider>
              <v-col
                  v-for="n in 7"
                  :key="n"
                  cols="3"
                  dense
                  class="passive-skills pa-2"
                >
                <div class="passive-lock" v-if="t[index - 1]['desc'][n+11]"><div style="position: relative;width: 45px;height: 45px;">{{ t[index - 1]['desc'][n+11]['points'] }}</div></div>
                <v-btn :ref="'t' + [index-1] + 'p'" @mouseover="skillHover = true;skillInfo = (t[index - 1]['desc'][n+11])" @mouseleave="skillHover = false" @mousemove="moxy($event)" @click="selectSkill((index - 1),n+11,'p') ? setActive((index - 1),n-1,'p') : setInactive((index - 1),n-1,'p')" color="#171e29" min-width="45" height="45" width="45" density="compact" rounded="rounded-0">
                  <v-img
                  :width="45"
                  aspect-ratio="1.1"
                  :src="`src/assets/skillcalc/skills_icons/${this.t[(index - 1)]['desc'][n+11]['skillid']}.gif`" />
                </v-btn>
              </v-col>
            </v-row>
            <v-row justify="space-around" dense>
              <v-col key="1" cols="4">
                <v-sheet @click="deleteTree(index - 1)" class="pa-2 ma-2" style="background-color:transparent;color:#fff;cursor: pointer;">
                  <v-icon icon="mdi-trash-can-outline "></v-icon>
                </v-sheet>
              </v-col>
              <v-col key="3" cols="4">
                <v-sheet class="pa-2 ma-2" @click="resetTree(index - 1);a=(index - 1)" style="background-color:transparent;color:#fff;cursor: pointer;">
                  <v-icon icon="mdi-reload "></v-icon>
                </v-sheet>
              </v-col>
              <v-col key="2" cols="4">
                <v-sheet class="pa-2 ma-2" @click="overlay = !overlay;a=(index - 1)" style="background-color:transparent;color:#fff;cursor: pointer;">
                  <v-icon icon="mdi-swap-vertical "></v-icon>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        </v-col>
        
        
      </v-row>
      </v-responsive>
    </v-container>
    <v-overlay v-model="overlay" class="align-center justify-center">
      <v-container>
      <v-row>
        <v-col cols="auto">
            <v-btn class="my-2" elevation="8" density="comfortable" block size="x-large" :ripple="false" v-for="item in uns" :key="item.id" @click="setSelected(item.id);"> {{item.name}} </v-btn>
        </v-col>
      </v-row>
    </v-container>
    </v-overlay>
    <v-overlay v-model="loverlay" class="align-center justify-center">
      <v-container>
      <v-row>
        <v-col cols="auto">
          <v-card class="mx-auto" style="background-color: #1f2b3b;color:#fff; border: 1px solid #31435d; border-radius: 8px; max-width:350">          
            <v-card-item>
              <div>
                <div class="text-overline mb-1">
                  <v-icon color="yellow-accent-4" icon="mdi-alert "></v-icon>
                </div>
                <v-card-text class="text--primary">
                  <div class="text-h4 mb-1">
                    Load build
                  </div>
                  <p class="text-h6">Class Name</p>
                  <p class="text-caption">( {{ classesStr }} ) </p>
                </v-card-text>
                <v-card-actions >
                  <v-btn variant="text" color="light-blue" style="color: #fff; background: #1f2b3b; " :ripple="false" @click="loadbuild();loadBuildPrompt();loverlay=!loverlay"> Load </v-btn>
                  <v-btn variant="text" color="orange-darken-1" style="color: #fff; background: #1f2b3b; " :ripple="false" @click="loverlay=!loverlay"> Cancel </v-btn>
                </v-card-actions>
                
              </div>
            </v-card-item>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
    </v-overlay>
    <div v-show="skillHover" ref="skillWindow" :style="skillHoverWindow">
      <v-card :class="`elevation-10`" style="color: #fff; background: #1f2b3b; border: 1px solid #31435d; border-radius: 8px; min-width:500px; max-width:500px;">
        <v-card-title>{{skillInfo['name']}}</v-card-title>
        <v-card-text><div v-html="content"></div></v-card-text>
      </v-card>
    </div>
    </v-container>
</template>

<script setup>
</script>
<script>
import axios from 'axios';
import xmlTojson from '../assets/skillcalc/xmlToJson.js';
import "@/assets/skillcalc/calc.css";
import { toRaw, } from 'vue';
import { useDisplay } from 'vuetify';
  export default {
    data: () => ({
      overlay: false,
      loverlay:false,
      bsaveModal:false,
      message: '',
      total_points:28,
      current_points:0,
      actives_per_tree:12,
      passives_per_tree:7,
      t: [{},{},{}],
      a:0,
      buildLoading:false,
      skillHover:false,
      mox:0,
      moy:0,
      mob:0,
      className:"No Class",
      skillInfo:"",
      treesArr:[],
      classesStr:"",
      classesBin:"",
      buildString:"",
      loadForm: false,
      buildStr:"",
      xmlError:null,
      classes:[
        {
          id:"0",
          name:"Battlerage",
          selected:"0",
          desc:""
        },
        {
          id:"1",
          name:"Witchcraft",
          selected:"0",
          desc:""
        },
        {
          id:"2",
          name:"Defense",
          selected:"0",
          desc:""
        },
        {
          id:"3",
          name:"Auramancy",
          selected:"0",
          desc:""
        },
        {
          id:"4",
          name:"Occultism",
          selected:"0",
          desc:""
        },
        {
          id:"5",
          name:"Archery",
          selected:"0",
          desc:""
        },
        {
          id:"6",
          name:"Sorcery",
          selected:"0",
          desc:""
        },
        {
          id:"7",
          name:"Shadowplay",
          selected:"0",
          desc:""
        },
        {
          id:"8",
          name:"Songcraft",
          selected:"0",
          desc:""
        },
        {
          id:"9",
          name:"Vitalism",
          selected:"0",
          desc:""
        },
      ],
      tree_Array:[{"id":[0,5,6],"name":""},{"id":[0,2,3],"name":"Abolisher"},{"id":[6,7,9],"name":"Animist"},{"id":[1,3,5],"name":"Arcane Hunter"},{"id":[1,3,6],"name":"Arcanist"},{"id":[1,2,5],"name":"Archon"},{"id":[0,3,9],"name":"Argent"},{"id":[1,7,9],"name":"Assassin"},{"id":[3,4,5],"name":"Astral Ranger"},{"id":[1,8,9],"name":"Athame"},{"id":[2,3,5],"name":"Bastion"},{"id":[2,4,6],"name":"Battlemage"},{"id":[0,4,9],"name":"Blackguard"},{"id":[0,7,8],"name":"Blade Dancer"},{"id":[0,2,7],"name":"Blighter"},{"id":[4,5,9],"name":"Blood Arrow"},{"id":[0,3,4],"name":"Bloodreaver"},{"id":[0,5,8],"name":"Bloodskald"},{"id":[0,8,9],"name":"Bloodthrall"},{"id":[0,3,5],"name":"Bonestalker"},{"id":[3,6,9],"name":"Boneweaver"},{"id":[1,2,6],"name":"Cabalist"},{"id":[2,8,9],"name":"Caretaker"},{"id":[3,8,9],"name":"Cleric"},{"id":[7,8,9],"name":"Confessor"},{"id":[0,2,6],"name":"Crusader"},{"id":[4,6,9],"name":"Cultist"},{"id":[1,6,7],"name":"Daggerspell"},{"id":[2,4,8],"name":"Dark Aegis"},{"id":[0,3,7],"name":"Darkrunner"},{"id":[0,2,8],"name":"Dawncaller"},{"id":[2,7,9],"name":"Death Warden"},{"id":[1,2,4],"name":"Defiler"},{"id":[1,4,6],"name":"Demonologist"},{"id":[0,1,9],"name":"Dervish"},{"id":[0,1,8],"name":"Dirgeweaver"},{"id":[4,7,9],"name":"Doombringer"},{"id":[0,2,2],"name":"Doomlord"},{"id":[0,4,5],"name":"Dreadbow"},{"id":[0,1,5],"name":"Dreadhunter"},{"id":[2,4,7],"name":"Dreadnaught"},{"id":[2,4,5],"name":"Dreadstone"},{"id":[1,2,3],"name":"Dreambreaker"},{"id":[2,5,9],"name":"Druid"},{"id":[2,6,8],"name":"Earthsinger"},{"id":[5,7,8],"name":"Ebonsong"},{"id":[3,4,9],"name":"Edgewalker"},{"id":[1,3,7],"name":"Eidolon"},{"id":[1,3,8],"name":"Enchantrix"},{"id":[0,3,6],"name":"Enforcer"},{"id":[3,6,7],"name":"Enigmatist"},{"id":[5,6,8],"name":"Evoker"},{"id":[0,4,7],"name":"Executioner"},{"id":[3,7,8],"name":"Exorcist"},{"id":[2,5,6],"name":"Farslayer"},{"id":[0,6,9],"name":"Fleshshaper"},{"id":[4,5,8],"name":"Gravesinger"},{"id":[6,8,9],"name":"Gypsy"},{"id":[0,1,6],"name":"Harbinger"},{"id":[0,6,7],"name":"Hellweaver"},{"id":[0,3,8],"name":"Herald"},{"id":[1,5,8],"name":"Hex Ranger"},{"id":[0,1,3],"name":"Hex Warden"},{"id":[0,1,2],"name":"Hexblade"},{"id":[1,3,9],"name":"Hierophant"},{"id":[2,5,8],"name":"Honorguard"},{"id":[0,1,4],"name":"Hordebreaker"},{"id":[3,5,8],"name":"Howler"},{"id":[5,6,7],"name":"Infiltrator"},{"id":[0,7,9],"name":"Inquisitor"},{"id":[2,4,9],"name":"Justicar"},{"id":[1,6,8],"name":"Lamentor"},{"id":[0,2,5],"name":"Liberator"},{"id":[0,4,8],"name":"Lorebreaker"},{"id":[5,6,9],"name":"Naturalist"},{"id":[1,4,9],"name":"Necromancer"},{"id":[2,7,8],"name":"Nightbearer"},{"id":[2,3,7],"name":"Nightblade"},{"id":[1,3,4],"name":"Nightcloak"},{"id":[1,7,8],"name":"Nightwitch"},{"id":[4,7,8],"name":"Nocturne"},{"id":[3,5,9],"name":"Oracle"},{"id":[0,5,7],"name":"Outrider"},{"id":[0,2,9],"name":"Paladin"},{"id":[3,4,8],"name":"Phantasm"},{"id":[3,4,7],"name":"Planeshifter"},{"id":[1,2,8],"name":"Poxbane"},{"id":[3,5,7],"name":"Primeval"},{"id":[5,7,9],"name":"Ranger"},{"id":[0,4,6],"name":"Ravager"},{"id":[4,6,7],"name":"Reaper"},{"id":[4,6,8],"name":"Requiem"},{"id":[3,4,6],"name":"Revenant"},{"id":[2,6,9],"name":"Scion"},{"id":[4,5,7],"name":"Shadehunter"},{"id":[1,4,5],"name":"Shadestriker"},{"id":[1,2,9],"name":"Shadowbane"},{"id":[0,1,7],"name":"Shadowblade"},{"id":[1,2,7],"name":"Shadowknight"},{"id":[1,6,9],"name":"Shaman"},{"id":[1,4,7],"name":"Shroudmaster"},{"id":[2,3,4],"name":"Skullknight"},{"id":[3,7,9],"name":"Soothsayer"},{"id":[4,8,9],"name":"Sorrowsong"},{"id":[1,5,9],"name":"Soulbow"},{"id":[5,8,9],"name":"Soulsong"},{"id":[4,5,6],"name":"Spellbow"},{"id":[6,7,8],"name":"Spellsinger"},{"id":[3,6,8],"name":"Spellsong"},{"id":[0,6,8],"name":"Spellsword"},{"id":[2,5,7],"name":"Stone Arrow"},{"id":[1,5,6],"name":"Stormcaster"},{"id":[3,5,6],"name":"Stormchaser"},{"id":[2,6,7],"name":"Swiftstone"},{"id":[2,3,9],"name":"Templar"},{"id":[2,3,6],"name":"Thaumaturge"},{"id":[2,3,8],"name":"Tomb Warden"},{"id":[1,4,8],"name":"Tombcaller"},{"id":[1,5,7],"name":"Trickster"},{"id":[0,5,9],"name":"Warpriest"}],
    }),
    computed:{
      uns(){
        return this.classes.filter(x => x.selected !== 1)
      },
      skillHoverWindow() {
        var a = this.mox
        if((this.mox+500) >= window.innerWidth){a=this.mox-550}
      return {
        "top": ` min(100vh - ${this.mob}px - 15px, ${this.moy}px)`,
        "left": `${a}px`,
        "position":"absolute",
      };
      },
      content() {
        if (this.skillInfo.length == 0){
          return ("");
        }else{
          return(this.skillInfo['desc']['#cdata-section'])
        }
      },
    },
    methods:{
      setSelected(id){
        
          console.log(`Selected Tree ${this.a}, with class ID ${id}.`)
          if (Object.keys(this.t[this.a]).length == 0){
            this.t[this.a] = JSON.parse(JSON.stringify(this.classes[id]));
            this.t[this.a].points = 0
            //this.loadData(parseInt(id)+1)
            this.classes[id].selected = 1
          }else{
            this.classes[this.t[this.a].id].selected = 0
            this.current_points = this.current_points - this.t[this.a]['points'],
            this.t[this.a] = JSON.parse(JSON.stringify(this.classes[id]));
            this.t[this.a].points = 0
            //this.loadData(parseInt(id)+1)
            this.classes[id].selected = 1
          }
          this.overlay = false
          this.setClassName()
          this.disableAll(this.a)
        
      },
      setClassName(){
        var t = []
        for(var i=0;i<3;i++){t.push(this.t[i]["id"])}
        var c = t.sort(function(a, b){return a-b});
        if (!c.length){
          this.className="No Class"
        }else if (c[2]){
          //this.className=this.classes[c[0]]['name'] + " Novice"
          var tr = this.tree_Array.find(item => item.id.toString() === c.toString())
          this.className=tr['name']
        }else{
          this.className="No Class"
        }
        console.log(c[2])
      },
      deleteTree(id){
        this.current_points = this.current_points - this.t[id]['points']
        this.classes[this.t[id]['id']]['selected'] = 0
        this.t[id] = {}
        this.className="No Class"
      },
      resetTree(id){
        this.current_points = this.current_points - this.t[id]['points']
        this.disableAll(id)
        this.t[id] = JSON.parse(JSON.stringify(this.classes[this.t[id]['id']]));
        this.t[id]['points'] = 0
      },
      moxy(e){
        this.mob = this.$refs.skillWindow.offsetHeight
        this.mox = e.clientX + 25
        this.moy = e.clientY + 25
      },
      loadData (a) {
        return new Promise((resolve,reject) => {
          this.xmlContent = null;
          this.xmlError = false;
          axios.get(`./skillcalc/trees/skills_${a}.xml`).then(response => {
            var b = response.data;
            var c = new DOMParser().parseFromString(b, 'text/xml');
            var d = toRaw(xmlTojson(c))
            d['skills']['skill'] = d['skills']['skill'].slice(0,19)
            for (let[x,y] of Object.entries(d['skills']['skill'])){
              y.active = false
            }
            this.t[this.a]['desc'] = d['skills']['skill']
          }, () => {
            this.xmlError = true;
          });
          return resolve()
        })
        },
        selectSkill(t,n,x){
          var z = 't'+t+'p'
          console.log(this.t[t]['desc'][n]['skillid'])
          if (this.t[t]['desc'][n].active == true){
            this.t[t]['desc'][n].active = false
            this.t[t].points = this.t[t].points - 1
            this.current_points = this.current_points - 1
            for( var i=18; i > 11; i-=1) {
                if(this.t[t].points <= this.t[t]['desc'][i]['points']){
                if(this.t[t]['desc'][i]['active'] == true){
                  this.$refs[z][i-12].$el.classList.add('inactive')
                  this.t[t]['desc'][i].active = false
                  this.t[t].points = this.t[t].points - 1
                  this.current_points = this.current_points - 1
                  return(false)
                }
                }
            }
            return(false)
          }else{
            if (this.checkPoints(t) === true){
              if(n >= 12 && this.t[t]['points'] >= parseInt(this.t[t]['desc'][n]['points'])){
                this.t[t]['desc'][n].active = true
                this.t[t].points = this.t[t].points + 1
                this.current_points = this.current_points + 1
                return(true)
              }else if (n >= 12 && this.t[t]['points'] < parseInt(this.t[t]['desc'][n]['points'])){
                return (false)
              }else{
                this.t[t]['desc'][n].active = true
                this.t[t].points = this.t[t].points + 1
                this.current_points = this.current_points + 1
                return(true)
              }
            }else{
              return(false)
            }
          }
        },
        checkPoints(t){
          if(this.t[t].points < 19 && this.current_points < this.total_points){
            return true
          }else{
            return false
          }
        },
        setActive(a,b,c){
          var d = 't'+a+c
          this.$refs[d][b].$el.classList.remove("inactive")
        },
        setInactive(a,b,c){
          var d = 't'+a+c
          console.log(b);
          this.$refs[d][b].$el.classList.add('inactive')
        },
        disableAll(a){
          var b = 't'+a+'a'
          var c = 't'+a+'p'
          this.$nextTick(function () {
            for(var i=0; i < 12; i++){
              this.$refs[b][i].$el.classList.add('inactive')
            }
            for(var i=0; i < 7; i++){
              this.$refs[c][i].$el.classList.add('inactive')
            }
          })
          
        },
        saveBuild(){
          var holder = ""
          var g=[]
          for(var i=0; i<3; i++){
            if (Object.keys(this.t[i]).length == 0){
              g.push(true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,)
            }else{
              holder = (parseInt(this.t[i]['id']).toString(2).padStart(4, '0')).split("")
              for (let i = 0; i < holder.length; i++) {
                g.push(!!+holder[i])
              }
              for(var n=0; n<19; n++){
                g.push(this.t[i]['desc'][n]['active'])
              }
            }
          }
          this.buildString = this.compress(g)
          console.log("saved!")
        },
        loadBuildPrompt(){
          this.classesStr=""
          this.classesBin=""
          this.treesArr=[]
          this.buildStr = this.buildStr.replace(/\s/g, '')
          try {
            var o = this.uncompressSave(this.buildStr);
            this.classesBin=o
              for(var i=0;i<3;i++){
                var l = o.slice((i*23),(i*23+4))
                for (var x=0;x<l.length;x++){
                 l[x]=+l[x]
                }
                l = parseInt(l.join(""), 2)
                  if (l==15){
                    this.classesStr = this.classesStr+"No Tree, "
                    this.treesArr.push(15)
                  }else{
                    this.classesStr = this.classesStr+ this.classes[l]['name']+ ", "
                    this.treesArr.push(l)
                  }
                }
              this.loverlay=true
            } catch (error) {
              console.error(error);
              // Expected output: ReferenceError: nonExistentFunction is not defined
              // (Note: the exact output may be browser-dependent)
            }
        },
        loadbuild(){
          for(var i=0;i<3;i++){
              if (Object.keys(this.t[i]).length != 0){
                  this.deleteTree(i)
                 }
                 this.a=i
                 if (this.treesArr[i] != 15){
                  this.setSelected(this.treesArr[i])
                 }
                 var o = this.classesBin.slice((i*23+4),(i*23))
                 var c = 0
                 for(var x = ((i*23)+4); x<((i*23)+23);x++){
                  if(this.classesBin[x]){
                    this.selectSkill(i,c)
                  }
                  c++
                 }
          }
          this.loadActive()
        },
        loadActive(){
          this.$nextTick(function () {
          for(var i=0;i<3;i++){
            var c=0
              for(var x = ((i*23)+4); x<((i*23)+23);x++){
                    var z = 't'+i+((c<12)?'a':'p')
                    var b = ((c<12)?c:c-12)
                  if(this.classesBin[x]){
                    this.$refs[z][b].$el.classList.remove("inactive")
                  }
                  c++
          }
          }
        })
        },
        async copyBuild() {
          await navigator.clipboard.writeText(this.buildString);
        },
        loadTrees : async(a) =>{
          var b=a+1
          return axios.get(`./skillcalc/trees/skills_${b}.xml`);
        },

        convertBase(value, from_base, to_base) {
          var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');
          var from_range = range.slice(0, from_base);
          var to_range = range.slice(0, to_base);

          var dec_value = value.split('').reverse().reduce(function(carry, digit, index) {
            if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `' + digit + '` for base ' + from_base + '.');
            return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
          }, 0);

          var new_value = '';
          while (dec_value > 0) {
            new_value = to_range[dec_value % to_base] + new_value;
            dec_value = (dec_value - (dec_value % to_base)) / to_base;
          }
          return new_value || '0';
        },

        compress(bools) {
          var sections = [], MAX_SAFE_SECTION = 52;
          for (var i = 0; i < bools.length; i++) {
            if (i % MAX_SAFE_SECTION == 0) sections.push([]);
            sections[Math.floor(i / MAX_SAFE_SECTION)][i % MAX_SAFE_SECTION] = bools[i] ? 1 : 0;
          }
          for (var i = 0; i < sections.length; i++) sections[i] = this.convertBase("1" + sections[i].join(""), 2, 62);
          return sections.join("");
        },

        uncompressSave(str) {
          var sections = [];
          while (str.length > 0) str = str.replace(sections[sections.length] = str.substring(0, 9), "");
          for (var i = 0; i < sections.length; i++) sections[i] = this.convertBase(sections[i], 62, 2).substring(1);
          var bools = sections.join("").split("");
          for (var i = 0; i < bools.length; i++) bools[i] = bools[i] == "1";
          return bools;
        },
    },
    async created () {
      for (var i=0; i<10; i++) {
        var b = await this.loadTrees(i)
        var c = new DOMParser().parseFromString(b["data"], 'text/xml');
        var d = toRaw(xmlTojson(c))
        d['skills']['skill'] = d['skills']['skill'].slice(0,19)
        for (let[x,y] of Object.entries(d['skills']['skill'])){
          y.active = false
        }
        this.classes[i]['desc'] = d['skills']['skill']
      }
      // for(var x=0;x<120;x++){
      //   this.tree_Array[x]['id'] = this.tree_Array[x]['id'].sort(function(a, b){return a-b});
      // }
      // console.log(JSON.stringify(this.tree_Array));
    },
    mounted(){
    },
    setup () {
      // Destructure only the keys we want to use
      const { xs, mdAndUp } = useDisplay()

      return { xs, mdAndUp }
    },
  }
</script>
