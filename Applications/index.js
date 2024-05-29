const path = require('path');
const fs = require('fs');
const baseDir = path.join(__dirname, '../parties');

class Parties {

     // utlities
     readDirectory () {
        const files  = fs.readdirSync(baseDir);
        return files  
    }

    filesExits (_filename) {
        const files = this.readDirectory();
        const found = files.find((filename) => filename === _filename);
        if(!found) {
            return false
        }else {
            return true
        }
    }


    createParties(name, data){
          let res;
          const filePath = path.join(baseDir, name);
          fs.appendFile(filepath, data,(err,res) => {
            if(err) {
                throw err
            }else {
                res = 'Parties created successfully'
            }
        })

        return res
    }

    getAllParties () {
        const filesContents = [];
        const files  = this.readDirectory();
        files.forEach((file) => {
            const filePath = path.join(baseDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            filesContents.push(JSON.parse(fileContent))
        });
        console.log(filesContents)
        return filesContents
    }


    getOneParty (_filename) {
        const isFound = this.filesExits(_filename);
        if(isFound) {
         const filePath = path.join(baseDir, _filename);
         const fileContent = fs.readFileSync(filePath, 'utf-8');
         return fileContent
        }else {
         return "perty not found"
        }
     }

     delteOneParty (_filename) {
        const isFound = this.filesExits(_filename);
        if(isFound) {
         const filePath = path.join(baseDir, _filename);
        fs.unlink(filePath);
         return "deleted successfully"
        }else {
         return "Party not found"
        }
     }

     updateVoteCount(name, votes) {
        const filename = `${name}.json`;
        if (this.fileExists(filename)) {
            const filePath = path.join(baseDir, filename);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const party = JSON.parse(fileContent);
            party.votes = votes;
            fs.writeFileSync(filePath, JSON.stringify(party));
            return "Vote count updated successfully";
        } else {
            return "Party not found";
        }
    }

    getLeaderboard() {
        const parties = this.getAllParties();
        return parties.sort((a, b) => b.votes - a.votes);
    }

}

const politicalParties = new Parties()
module.exports = politicalParties